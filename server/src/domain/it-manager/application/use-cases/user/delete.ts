import { UseCase } from '@/core/use-cases/use-case'
import { UsersRepository } from '../../repositories/users-repository'
import { Either, failure, success } from '@/core/types/either'
import { NotFound, NotFoundError } from '@/core/errors/not-found'

type DeleteUseCaseResponse = Either<NotFoundError, { userId: string }>

export class DeleteUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<DeleteUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      return failure(NotFound('User not found'))
    }

    await this.usersRepository.delete(id)

    return success({ userId: id })
  }
}
