import { type Either, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { License } from '@/domain/it-manager/enterprise/entities/license'

import type { LicenseRepository } from '../../repositories/license-repository'

type FetchAllLicensesUseCaseResponse = Either<unknown, { licenses: License[] }>

export class FetchAllLicensesUseCase implements UseCase {
  constructor(private readonly licenseRepository: LicenseRepository) {}

  async execute({ enterpriseName }: { enterpriseName?: string }): Promise<FetchAllLicensesUseCaseResponse> {
    const licenses = await this.licenseRepository.findMany(enterpriseName)

    return success({ licenses })
  }
}
