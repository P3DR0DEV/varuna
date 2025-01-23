import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Printer } from '@/domain/it-manager/enterprise/entities/printer'

import type { PrinterRepository } from '../../repositories/printer-repository'

type GetPrinterByNameUseCaseProps = {
  name: string
}

type GetPrinterByNameUseCaseResponse = Either<NotFoundError | BadRequestError, { printer: Printer }>

export class GetPrinterByNameUseCase implements UseCase {
  constructor(private readonly printerRepository: PrinterRepository) {}

  async execute({ name }: GetPrinterByNameUseCaseProps): Promise<GetPrinterByNameUseCaseResponse> {
    if (!name) {
      return failure(BadRequest('Name is required'))
    }

    const printer = await this.printerRepository.findByName(name)

    if (!printer) {
      return failure(NotFound('Printer not found'))
    }

    return success({ printer })
  }
}
