import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { Printer } from '@/domain/it-manager/enterprise/entities/printer'

import type { PrinterRepository } from '../../repositories/printer-repository'

type GetPrinterByTagUseCaseProps = {
  tag: string
}

type GetPrinterByTagUseCaseResponse = Either<NotFoundError | BadRequestError, { printer: Printer }>

export class GetPrinterByTagUseCase {
  constructor(private readonly printerRepository: PrinterRepository) {}

  async execute({ tag }: GetPrinterByTagUseCaseProps): Promise<GetPrinterByTagUseCaseResponse> {
    if (!tag) {
      return failure(BadRequest('Tag is required'))
    }

    const printer = await this.printerRepository.findByTag(tag)

    if (!printer) {
      return failure(NotFound('Printer not found'))
    }

    return success({ printer })
  }
}
