import { Either, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { License } from '@/domain/it-manager/enterprise/entities/license'

import { LicenseRepository } from '../../repositories/license-repository'

type FetchAllLicensesUseCaseResponse = Either<unknown, { licenses: License[] }>

export class FetchAllLicensesUseCase implements UseCase {
  constructor(private readonly licenseRepository: LicenseRepository) {}

  async execute(): Promise<FetchAllLicensesUseCaseResponse> {
    const licenses = await this.licenseRepository.findMany()

    return success({ licenses })
  }
}
