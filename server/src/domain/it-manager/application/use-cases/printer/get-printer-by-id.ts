import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Printer } from '@/domain/it-manager/enterprise/entities/printer'

import { PrinterRepository } from '../../repositories/printer-repository'

type GetPrinterByIdUseCaseProps = {
  id: string
}

type GetPrinterByIdUseCaseResponse = Either<BadRequestError | NotFoundError, { printer: Printer }>

export class GetPrinterByIdUseCase implements UseCase {
  constructor(private readonly printerRepository: PrinterRepository) {}

  async execute({ id }: GetPrinterByIdUseCaseProps): Promise<GetPrinterByIdUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const printer = await this.printerRepository.findById(id)

    if (!printer) {
      return failure(NotFound('Printer not found'))
    }

    return success({ printer })
  }
}
