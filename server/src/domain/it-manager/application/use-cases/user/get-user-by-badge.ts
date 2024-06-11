import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { UseCase } from '@/core/use-cases/use-case'
import { NotFound, NotFoundError } from '@/core/errors/not-found'

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
