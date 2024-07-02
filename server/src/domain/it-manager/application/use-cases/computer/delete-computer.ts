import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'

import { ComputerRepository } from '../../repositories/computer-repository'

type DeleteComputerUseCaseProps = {
  id: string
}

type DeleteComputerUseCaseResponse = Either<BadRequestError | NotFoundError, { message: string }>

export class DeleteComputerUseCase implements UseCase {
  constructor(private readonly computerRepository: ComputerRepository) {}

  async execute({ id }: DeleteComputerUseCaseProps): Promise<DeleteComputerUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const computer = await this.computerRepository.findById(id)

    if (!computer) {
      return failure(NotFound('This computer does not exist or already has been deleted'))
    }

    await this.computerRepository.delete(id)

    return success({ message: 'Computer deleted successfully' })
  }
}
