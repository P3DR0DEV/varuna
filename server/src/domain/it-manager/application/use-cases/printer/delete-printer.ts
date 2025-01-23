import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'

import type { PrinterRepository } from '../../repositories/printer-repository'

type DeletePrinterUseCaseProps = {
  id: string
}

type DeletePrinterUseCaseResponse = Either<BadRequestError | NotFoundError, { message: string }>

export class DeletePrinterUseCase implements UseCase {
  constructor(private readonly printerRepository: PrinterRepository) {}

  async execute({ id }: DeletePrinterUseCaseProps): Promise<DeletePrinterUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('id is required'))
    }

    const printer = await this.printerRepository.findById(id)

    if (!printer) {
      return failure(NotFound('This printer does not exist or already has been deleted'))
    }

    await this.printerRepository.delete(id)

    return success({ message: 'Printer deleted successfully' })
  }
}
