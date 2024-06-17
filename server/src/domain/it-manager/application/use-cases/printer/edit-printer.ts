import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { Optional } from '@/core/types/optional'
import { UseCase } from '@/core/use-cases/use-case'
import { Printer, PrinterProps } from '@/domain/it-manager/enterprise/entities/printer'

import { PrinterRepository } from '../../repositories/printer-repository'

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

    await this.printerRepository.save(printer)

    return success({ printer })
  }
}
