import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { Optional } from '@/core/types/optional'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Printer, PrinterProps } from '@/domain/it-manager/enterprise/entities/printer'

import type { PrinterRepository } from '../../repositories/printer-repository'

type EditPrinterUseCaseProps = {
  id: string
} & Optional<PrinterProps, 'createdAt' | 'updatedAt' | 'modelSlug'>

type EditPrinterUseCaseResponse = Either<NotFoundError | BadRequestError, { printer: Printer }>

export class EditPrinterUseCase implements UseCase {
  constructor(private readonly printerRepository: PrinterRepository) {}

  async execute({ id, ...props }: EditPrinterUseCaseProps): Promise<EditPrinterUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const printer = await this.printerRepository.findById(id)

    if (!printer) {
      return failure(NotFound('Printer not found'))
    }

    if (props.name !== printer.name) {
      const printerExists = await this.printerRepository.findByName(props.name)

      if (printerExists && printerExists.id !== printer.id) {
        return failure(BadRequest('Printer already exists with this name'))
      }
    }

    if (props.tag && props.tag !== printer.tag) {
      const printerExists = await this.printerRepository.findByTag(props.tag)

      if (printerExists && printerExists.id !== printer.id) {
        return failure(BadRequest('Printer already exists with this tag'))
      }
    }

    if (props.ipAddress && props.ipAddress !== printer.ipAddress) {
      const printerExists = await this.printerRepository.findByIpAddress(props.ipAddress)

      if (printerExists && printerExists.id !== printer.id) {
        return failure(BadRequest('Printer already exists with the same IpAddress'))
      }
    }

    if (props.serialNumber !== printer.serialNumber) {
      const printerExists = await this.printerRepository.findBySerialNumber(props.serialNumber)

      if (printerExists && printerExists.id !== printer.id) {
        return failure(BadRequest('Printer already exists with this serial number'))
      }
    }

    printer.acquisitionDate = props.acquisitionDate
    printer.ipAddress = props.ipAddress
    printer.model = props.model
    printer.name = props.name
    printer.serialNumber = props.serialNumber
    printer.type = props.type
    printer.invoiceNumber = props.invoiceNumber
    printer.observations = props.observations
    printer.endWarrantyDate = props.endWarrantyDate
    printer.tag = props.tag
    printer.printing = props.printing

    await this.printerRepository.save(printer)

    return success({ printer })
  }
}
