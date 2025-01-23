import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import { Printer, type PrinterTypes, type PrintingOptions } from '@/domain/it-manager/enterprise/entities/printer'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import type { PrinterRepository } from '../../repositories/printer-repository'

type CreatePrinterUseCaseProps = {
  name: string
  type: PrinterTypes
  printing: PrintingOptions
  ipAddress?: string | null
  observations?: string | null
  serialNumber: string
  model: string
  acquisitionDate: Date
  tag?: string | null
  endWarrantyDate?: Date | null
  invoiceNumber?: string | null
  contractId?: string | null
}

type CreatePrinterUseCaseResponse = Either<BadRequestError, { printer: Printer }>

export class CreatePrinterUseCase implements UseCase {
  constructor(private readonly printerRepository: PrinterRepository) {}

  async execute(props: CreatePrinterUseCaseProps): Promise<CreatePrinterUseCaseResponse> {
    const findName = await this.printerRepository.findByName(props.name)
    const findSerialNumber = await this.printerRepository.findBySerialNumber(props.serialNumber)
    const findTag = await this.printerRepository.findByTag(props.tag ?? '')

    if (findName) {
      return failure(BadRequest('Printer already exists with this name'))
    }

    if (findSerialNumber) {
      return failure(BadRequest('Printer already exists with this serial number'))
    }

    if (findTag) {
      return failure(BadRequest('Printer already exists with this tag'))
    }

    if (props.ipAddress) {
      const findIp = await this.printerRepository.findByIpAddress(props.ipAddress)

      if (findIp) {
        return failure(BadRequest('Printer already exists with this IP'))
      }
    }

    const printer = Printer.create({
      ...props,
      modelSlug: Slug.createFromText(props.model),
      contractId: props.contractId ? new UniqueEntityID(props.contractId) : null,
    })

    await this.printerRepository.create(printer)

    return success({ printer })
  }
}
