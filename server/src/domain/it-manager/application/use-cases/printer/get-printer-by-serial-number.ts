import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Printer } from '@/domain/it-manager/enterprise/entities/printer'

import type { PrinterRepository } from '../../repositories/printer-repository'

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
