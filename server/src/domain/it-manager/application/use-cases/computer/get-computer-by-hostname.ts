import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Computer } from '@/domain/it-manager/enterprise/entities/computer'

import type { ComputerRepository } from '../../repositories/computer-repository'

type GetComputerByHostNameUseCaseProps = {
  hostname: string
}

type GetComputerByHostNameUseCaseResponse = Either<NotFoundError | BadRequestError, { computer: Computer }>

export class GetComputerByHostNameUseCase implements UseCase {
  constructor(private readonly computerRepository: ComputerRepository) {}

  async execute({ hostname }: GetComputerByHostNameUseCaseProps): Promise<GetComputerByHostNameUseCaseResponse> {
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
