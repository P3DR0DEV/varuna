import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Computer } from '@/domain/it-manager/enterprise/entities/computer'

import type { ComputerRepository } from '../../repositories/computer-repository'

type GetComputerByIdUseCaseProps = {
  id: string
}

type GetComputerByIdUseCaseResponse = Either<BadRequestError | NotFoundError, { computer: Computer }>

export class GetComputerByIdUseCase implements UseCase {
  constructor(private readonly computerRepository: ComputerRepository) {}

  async execute({ id }: GetComputerByIdUseCaseProps): Promise<GetComputerByIdUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const computer = await this.computerRepository.findById(id)

    if (!computer) {
      return failure(NotFound('Computer not found'))
    }

    return success({ computer })
  }
}
