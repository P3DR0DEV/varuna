import { Either, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Printer, PrinterTypes, PrintingOptions } from '@/domain/it-manager/enterprise/entities/printer'

import { PrinterRepository } from '../../repositories/printer-repository'

type FetchAllPrintersUseCaseProps = {
  type?: PrinterTypes
  option?: PrintingOptions  
}

export type FetchAllPrintersUseCaseResponse = Either<Error, { printers: Printer[] }>

export class FetchAllPrintersUseCase implements UseCase {
  constructor(private readonly printerRepository: PrinterRepository) {}

  async execute({ type, option }: FetchAllPrintersUseCaseProps): Promise<FetchAllPrintersUseCaseResponse> {
    const printers = await this.printerRepository.findMany({
      type,
      option
    })

    return success({ printers })
  }
}
