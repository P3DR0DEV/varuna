import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

import type { UserLicenseRepository } from '../../repositories/user-license-repository'
import type { UsersRepository } from '../../repositories/users-repository'

type FetchUserLicenseByUserUseCaseProps = {
  userId: string
}

type FetchUserLicenseByUserUseCaseResponse = Either<NotFoundError | BadRequestError, { userLicense: UserLicense[] }>

export class FetchUserLicenseByUserUseCase implements UseCase {
  constructor(
    private readonly userLicenseRepository: UserLicenseRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ userId }: FetchUserLicenseByUserUseCaseProps): Promise<FetchUserLicenseByUserUseCaseResponse> {
    if (!userId) {
      return failure(BadRequest('UserId is required'))
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(NotFound('User not found'))
    }

    const userLicense = await this.userLicenseRepository.findByUserId(userId)

    return success({ userLicense })
  }
}
