import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { User } from '@/domain/it-manager/enterprise/entities/user'

import type { UsersRepository } from '../../repositories/users-repository'

type GetUserByIdUseCaseProps = { id: string }

type GetUserByIdUseCaseResponse = Either<BadRequestError | NotFoundError, { user: User }>

export class GetUserByIdUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ id }: GetUserByIdUseCaseProps): Promise<GetUserByIdUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const user = await this.usersRepository.findById(id)

    if (!user) {
      return failure(NotFound('User not found.'))
    }

    return success({ user })
  }
}
