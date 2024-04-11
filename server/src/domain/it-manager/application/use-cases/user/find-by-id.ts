import { Either, failure, success } from '@/core/types/either'
import { UsersRepository } from '../../repositories/users-repository'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UseCase } from '@/core/use-cases/use-case'

type FindByIdUseCaseResponse = Either<NotFoundError, { user: User }>

export class FindByIdUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<FindByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      return failure(NotFound('User not found.'))
    }

    return success({ user })
  }
}
