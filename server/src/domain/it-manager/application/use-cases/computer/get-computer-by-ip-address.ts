import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Computer } from '@/domain/it-manager/enterprise/entities/computer'

import type { ComputerRepository } from '../../repositories/computer-repository'

type GetComputerByIpAddressUseCaseProps = {
  ipAddress: string
}
type GetComputerByIpAddressUseCaseResponse = Either<BadRequestError | NotFoundError, { computer: Computer }>

export class GetComputerByIpAddressUseCase implements UseCase {
  constructor(private readonly computerRepository: ComputerRepository) {}

  async execute({ ipAddress }: GetComputerByIpAddressUseCaseProps): Promise<GetComputerByIpAddressUseCaseResponse> {
    if (!ipAddress) {
      return failure(BadRequest('ipAddress is required'))
    }

    const computer = await this.computerRepository.findByIpAddress(ipAddress)

    if (!computer) {
      return failure(NotFound('Computer not found'))
    }

    return success({ computer })
  }
}
