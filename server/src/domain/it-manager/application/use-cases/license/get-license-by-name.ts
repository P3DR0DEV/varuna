import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { License } from '@/domain/it-manager/enterprise/entities/license'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import { LicenseRepository } from '../../repositories/license-repository'

type GetLicenseByNameUseCaseProps = {
  name: string
}

type GetLicenseByNameUseCaseResponse = Either<BadRequestError | NotFoundError, { license: License }>

export class GetLicenseByNameUseCase implements UseCase {
  constructor(private readonly licenseRepository: LicenseRepository) {}

  async execute({ name }: GetLicenseByNameUseCaseProps): Promise<GetLicenseByNameUseCaseResponse> {
    if (!name) {
      return failure(BadRequest('Name is required'))
    }

    const licenseName = Slug.createFromText(name).value

    const license = await this.licenseRepository.findByName(licenseName)

    if (!license) {
      return failure(NotFound('License not found'))
    }

    return success({ license })
  }
}
