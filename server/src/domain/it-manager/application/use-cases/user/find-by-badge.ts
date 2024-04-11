import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { UseCase } from '@/core/use-cases/use-case'

type FindByBadgeUseCaseResponse = Either<BadRequestError, { user: User }>

export class FindByBadgeUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(badge: string): Promise<FindByBadgeUseCaseResponse> {
    const user = await this.usersRepository.findByBadge(badge)

    if (!user) {
      return failure(BadRequest('User not found for the provided badge'))
    }

    return success({ user })
  }
}
