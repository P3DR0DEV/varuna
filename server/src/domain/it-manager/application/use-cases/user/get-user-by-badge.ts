import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { User } from '@/domain/it-manager/enterprise/entities/user'

import type { UsersRepository } from '../../repositories/users-repository'

type GetUserByBadgeUseCaseProps = {
  badge: string
}
type GetUserByBadgeUseCaseResponse = Either<BadRequestError | NotFoundError, { user: User }>

export class GetUserByBadgeUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ badge }: GetUserByBadgeUseCaseProps): Promise<GetUserByBadgeUseCaseResponse> {
    if (!badge) {
      return failure(BadRequest('Badge is required'))
    }

    const user = await this.usersRepository.findByBadge(badge)

    if (!user) {
      return failure(NotFound('User not found for the provided badge'))
    }

    return success({ user })
  }
}
