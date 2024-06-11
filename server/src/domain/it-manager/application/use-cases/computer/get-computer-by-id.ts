import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

import { ComputerRepository } from '../../repositories/computer-repository'

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
