import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Printer, PrintingOptions } from '@/domain/it-manager/enterprise/entities/printer'

import { PrinterRepository } from '../../repositories/printer-repository'

type FetchPrintersByPrintingOptionsUseCaseProps = {
  option: PrintingOptions
}

type FetchPrintersByPrintingOptionsUseCaseResponse = Either<BadRequestError, { printers: Printer[] }>

export class FetchPrintersByPrintingOptionsUseCase implements UseCase {
  constructor(private readonly printerRepository: PrinterRepository) {}

  async execute({
    option,
  }: FetchPrintersByPrintingOptionsUseCaseProps): Promise<FetchPrintersByPrintingOptionsUseCaseResponse> {
    if (!option) {
      return failure(BadRequest('Options are required'))
    }

    if (!['colorful', 'monochrome'].includes(option)) {
      return failure(BadRequest('Options are invalid'))
    }

    const printers = await this.printerRepository.findByPrintingOptions(option)

    return success({ printers })
  }
}
