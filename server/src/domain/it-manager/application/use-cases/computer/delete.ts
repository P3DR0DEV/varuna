import { UseCase } from '@/core/use-cases/use-case'
import { ComputerRepository } from '../../repositories/computer-repository'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'

type DeleteUseCaseResponse = Either<BadRequestError | NotFoundError, { message: string }>

export class DeleteUseCase implements UseCase {
  constructor(private computerRepository: ComputerRepository) {}

  async execute(id: string): Promise<DeleteUseCaseResponse> {
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
