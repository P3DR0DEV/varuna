import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

import { UserLicenseRepository } from '../../repositories/user-license-repository'

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
