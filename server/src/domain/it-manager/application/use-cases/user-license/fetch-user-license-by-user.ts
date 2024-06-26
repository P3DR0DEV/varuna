import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

import { UserLicenseRepository } from '../../repositories/user-license-repository'
import { UsersRepository } from '../../repositories/users-repository'

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
