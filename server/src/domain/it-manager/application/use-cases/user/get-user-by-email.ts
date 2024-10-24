import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { User } from '@/domain/it-manager/enterprise/entities/user'

import { UsersRepository } from '../../repositories/users-repository'

type GetUserByEmailUseCaseProps = {
  email: string
}
type GetUserByEmailUseCaseResponse = Either<BadRequestError | NotFoundError, { user: User }>

export class GetUserByEmailUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute({ email }: GetUserByEmailUseCaseProps): Promise<GetUserByEmailUseCaseResponse> {
    if (!email) {
      return failure(BadRequest('Email is required'))
    }

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return failure(NotFound('User not found'))
    }

    return success({ user })
  }
}
