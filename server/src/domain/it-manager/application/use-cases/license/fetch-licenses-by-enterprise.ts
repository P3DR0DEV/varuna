import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { License } from '@/domain/it-manager/enterprise/entities/license'

import { LicenseRepository } from '../../repositories/license-repository'

type FetchLicensesByEnterpriseUseCaseResponse = Either<BadRequestError, { licenses: License[] }>

export class FetchLicensesByEnterpriseUseCase implements UseCase {
  constructor(private readonly licenseRepository: LicenseRepository) {}

  async execute({ enterpriseName }: { enterpriseName: string }): Promise<FetchLicensesByEnterpriseUseCaseResponse> {
    if (!enterpriseName) {
      return failure(BadRequest('Enterprise name is required'))
    }

    const licenses = await this.licenseRepository.findByEnterprise(enterpriseName)

    return success({ licenses })
  }
}
