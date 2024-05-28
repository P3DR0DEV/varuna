import { UseCase } from '@/core/use-cases/use-case'
import { ComputerRepository } from '../../repositories/computer-repository'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'

export type FindByIpAddressUseCaseResponse = Either<BadRequestError | NotFoundError, { computer: Computer }>

export class FindByIpAddressUseCase implements UseCase {
  constructor(private computerRepository: ComputerRepository) {}

  async execute(ipAddress: string): Promise<FindByIpAddressUseCaseResponse> {
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
