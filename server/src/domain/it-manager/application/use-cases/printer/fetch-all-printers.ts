import { Either, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Printer } from '@/domain/it-manager/enterprise/entities/printer'

import { PrinterRepository } from '../../repositories/printer-repository'

export type FetchAllPrintersUseCaseResponse = Either<Error, { printers: Printer[] }>

export class FetchAllPrintersUseCase implements UseCase {
  constructor(private readonly printerRepository: PrinterRepository) {}

  async execute(): Promise<FetchAllPrintersUseCaseResponse> {
    const printers = await this.printerRepository.findMany()

    return success({ printers })
  }
}
