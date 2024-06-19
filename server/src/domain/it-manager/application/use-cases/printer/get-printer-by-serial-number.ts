import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Printer } from '@/domain/it-manager/enterprise/entities/printer'

import { PrinterRepository } from '../../repositories/printer-repository'

type GetPrinterBySerialNumberUseCaseProps = {
  serialNumber: string
}

type GetPrinterBySerialNumberUseCaseResponse = Either<BadRequestError | NotFoundError, { printer: Printer }>

export class GetPrinterBySerialNumberUseCase implements UseCase {
  constructor(private readonly printerRepository: PrinterRepository) {}

  async execute({
    serialNumber,
  }: GetPrinterBySerialNumberUseCaseProps): Promise<GetPrinterBySerialNumberUseCaseResponse> {
    if (!serialNumber) {
      return failure(BadRequest('Serial number is required'))
    }

    const printer = await this.printerRepository.findBySerialNumber(serialNumber)

    if (!printer) {
      return failure(NotFound('Printer not found'))
    }

    return success({ printer })
  }
}
