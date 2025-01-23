import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

import type { UserLicenseRepository } from '../../repositories/user-license-repository'

type GetUserLicenseByIdUseCaseProps = {
  id: string
}

type GetUserLicenseByIdUseCaseResponse = Either<NotFoundError | BadRequestError, { userLicense: UserLicense }>

export class GetUserLicenseByIdUseCase implements UseCase {
  constructor(private readonly userLicenseRepository: UserLicenseRepository) {}

  async execute({ id }: GetUserLicenseByIdUseCaseProps): Promise<GetUserLicenseByIdUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const userLicense = await this.userLicenseRepository.findById(id)

    if (!userLicense) {
      return failure(NotFound('User-license not found'))
    }

    return success({ userLicense })
  }
}
