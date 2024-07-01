import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { License, LicenseProps } from '@/domain/it-manager/enterprise/entities/license'
import { PrismaLicensesMapper } from '@/infra/database/prisma/mappers/prisma-licenses-mapper'

export function makeLicense(override: Partial<LicenseProps> = {}, id?: UniqueEntityID) {
  const license = License.create(
    {
      name: faker.commerce.productName(),
      quantity: faker.number.int({ max: 100 }),
      enterpriseName: faker.company.name(),
      price: faker.number.int({ min: 10, max: 100 }),
      status: 'active',
      ...override,
    },
    id,
  )

  return license
}

export class LicenseFactory {
  constructor(private prisma: PrismaClient) {}

  async createLicense(data: Partial<LicenseProps> = {}) {
    const license = makeLicense(data)

    await this.prisma.license.create({ data: PrismaLicensesMapper.toPersistence(license) })

    return license
  }
}
