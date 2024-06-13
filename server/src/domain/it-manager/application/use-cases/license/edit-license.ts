import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { License } from '@/domain/it-manager/enterprise/entities/license'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import { LicenseRepository } from '../../repositories/license-repository'

type EditLicenseUseCaseProps = {
  id: string
  name: string
  quantity: number
  enterpriseName: string
  price: number
  status?: 'active' | 'inactive'
  expirationDate?: Date | null
}

type EditLicenseUseCaseResponse = Either<BadRequestError | NotFoundError, { license: License }>

export class EditLicenseUseCase implements UseCase {
  constructor(private readonly licenseRepository: LicenseRepository) {}

  async execute({
    id,
    name,
    quantity,
    enterpriseName,
    price,
    status,
    expirationDate,
  }: EditLicenseUseCaseProps): Promise<EditLicenseUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('ID is required'))
    }
    const license = await this.licenseRepository.findById(id)

    if (!license) {
      return failure(NotFound('License not found'))
    }

    const licenseExists = await this.licenseRepository.findByName(Slug.createFromText(name).value)

    if (licenseExists && licenseExists.id.toString() !== id) {
      return failure(BadRequest('One license with this name already exists, you can update his quantity'))
    }

    license.name = name
    license.quantity = quantity
    license.enterpriseName = enterpriseName
    license.price = price
    license.status = status ?? license.status
    license.expirationDate = expirationDate ?? license.expirationDate

    return success({ license })
  }
}
