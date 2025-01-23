import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import { License } from '@/domain/it-manager/enterprise/entities/license'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import type { LicenseRepository } from '../../repositories/license-repository'

type CreateLicenseUseCaseProps = {
  name: string
  quantity: number
  enterpriseName: string
  price: number
  status?: 'active' | 'inactive' | null
  expiresAt?: Date | null
}

type CreateLicenseUseCaseResponse = Either<BadRequestError, { license: License }>

export class CreateLicenseUseCase implements UseCase {
  constructor(private readonly licenseRepository: LicenseRepository) {}

  async execute({
    name,
    quantity,
    enterpriseName,
    price,
    status,
    expiresAt,
  }: CreateLicenseUseCaseProps): Promise<CreateLicenseUseCaseResponse> {
    const licenseExists = await this.licenseRepository.findByName(Slug.createFromText(name).value)

    if (licenseExists) {
      return failure(BadRequest('One license with this name already exists, you can update his quantity'))
    }

    const license = License.create({
      name,
      quantity,
      enterpriseName,
      price,
      status,
      expiresAt,
    })

    await this.licenseRepository.create(license)

    return success({ license })
  }
}
