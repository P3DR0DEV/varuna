import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

import { ComputerRepository } from '../../repositories/computer-repository'

type GetComputerByHostNameUseCaseResponse = Either<NotFoundError | BadRequestError, { computer: Computer }>

export class GetComputerByHostNameUseCase implements UseCase {
  constructor(private readonly computerRepository: ComputerRepository) {}

  async execute(hostname: string): Promise<GetComputerByHostNameUseCaseResponse> {
    if (!hostname) {
      return failure(BadRequest('Hostname is required'))
    }

    const computer = await this.computerRepository.findByHostname(hostname)

    if (!computer) {
      return failure(NotFound('Computer not found'))
    }

    return success({ computer })
  }
}
