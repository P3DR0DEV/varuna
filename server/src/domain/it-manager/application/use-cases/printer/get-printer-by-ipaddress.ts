import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Printer } from '@/domain/it-manager/enterprise/entities/printer'

import type { PrinterRepository } from '../../repositories/printer-repository'

type GetPrinterByIpAddressUseCaseProps = {
  ipAddress: string
}
type GetPrinterByIpAddressUseCaseResponse = Either<BadRequestError | NotFoundError, { printer: Printer }>

export class GetPrinterByIpAddressUseCase implements UseCase {
  constructor(private readonly printerRepository: PrinterRepository) {}

  async execute({ ipAddress }: GetPrinterByIpAddressUseCaseProps): Promise<GetPrinterByIpAddressUseCaseResponse> {
    if (!ipAddress) {
      return failure(BadRequest('IP address is required'))
    }
    const printer = await this.printerRepository.findByIpAddress(ipAddress)

    if (!printer) {
      return failure(NotFound('Printer not found'))
    }

    return success({ printer })
  }
}
