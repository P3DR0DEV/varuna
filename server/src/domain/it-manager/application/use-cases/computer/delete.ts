import { UseCase } from '@/core/use-cases/use-case'
import { ComputerRepository } from '../../repositories/computer-repository'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'

type DeleteUseCaseResponse = Either<BadRequestError, { message: string }>

export class DeleteUseCase implements UseCase {
  constructor(private computerRepository: ComputerRepository) {}

  async execute(id: string): Promise<DeleteUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }
    await this.computerRepository.delete(id)

    return success({ message: 'Computer deleted successfully' })
  }
}
