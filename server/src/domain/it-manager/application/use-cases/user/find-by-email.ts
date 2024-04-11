import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Either, failure, success } from '@/core/types/either'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'

type FindByEmailUseCaseResponse = Either<NotFoundError, { user: User }>

export class FindByEmailUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute(email: string): Promise<FindByEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return failure(NotFound('User not found'))
    }

    return success({ user })
  }
}
