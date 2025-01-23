import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

import type { LicenseRepository } from '../../repositories/license-repository'
import type { UserLicenseRepository } from '../../repositories/user-license-repository'

type GetUserLicenseByLicenseUseCaseProps = {
  licenseId: string
}

type GetUserLicenseByLicenseUseCaseResponse = Either<NotFoundError | BadRequestError, { userLicense: UserLicense }>

export class GetUserLicenseByLicenseUseCase {
  constructor(
    private readonly userLicenseRepository: UserLicenseRepository,
    private readonly licenseRepository: LicenseRepository,
  ) {}

  async execute({ licenseId }: GetUserLicenseByLicenseUseCaseProps): Promise<GetUserLicenseByLicenseUseCaseResponse> {
    if (!licenseId) {
      return failure(BadRequest('License id is required'))
    }

    const license = await this.licenseRepository.findById(licenseId)

    if (!license) {
      return failure(NotFound('License not found'))
    }

    const userLicense = await this.userLicenseRepository.findByLicenseId(licenseId)

    if (!userLicense) {
      return failure(NotFound('No relations found for this license'))
    }

    return success({ userLicense })
  }
}
