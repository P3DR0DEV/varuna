import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { License } from '@/domain/it-manager/enterprise/entities/license'

import { LicenseRepository } from '../../repositories/license-repository'

type GetLicenseByIdUseCaseProps = {
  id: string
}

type GetLicenseByIdUseCaseResponse = Either<NotFoundError | BadRequestError, { license: License }>

export class GetLicenseByIdUseCase implements UseCase {
  constructor(private readonly licenseRepository: LicenseRepository) {}

  async execute({ id }: GetLicenseByIdUseCaseProps): Promise<GetLicenseByIdUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const license = await this.licenseRepository.findById(id)

    if (!license) {
      return failure(NotFound('License not found'))
    }

    return success({ license })
  }
}
