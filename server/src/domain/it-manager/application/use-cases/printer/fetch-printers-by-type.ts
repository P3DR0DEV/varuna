import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Printer, PrinterTypes } from '@/domain/it-manager/enterprise/entities/printer'

import { PrinterRepository } from '../../repositories/printer-repository'

type FetchPrintersByTypeUseCaseProps = {
  type: PrinterTypes
}

type FetchPrintersByTypeUseCaseResponse = Either<BadRequestError, { printers: Printer[] }>
export class FetchPrintersByTypeUseCase implements UseCase {
  constructor(private readonly printerRepository: PrinterRepository) {}

  async execute({ type }: FetchPrintersByTypeUseCaseProps): Promise<FetchPrintersByTypeUseCaseResponse> {
    if (!type) {
      return failure(BadRequest('Type is required'))
    }

    if (['laser', 'inkjet', 'thermal', 'dotmatrix'].indexOf(type) === -1) {
      return failure(BadRequest('Invalid type params'))
    }

    const printers = await this.printerRepository.findByType(type)

    return success({ printers })
  }
}
