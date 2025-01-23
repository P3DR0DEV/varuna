import { faker } from '@faker-js/faker'
import type { PrismaClient } from '@prisma/client'

import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Mobile, type MobileProps } from '@/domain/it-manager/enterprise/entities/mobile'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'
import { PrismaMobilesMapper } from '@/infra/database/prisma/mappers/prisma-mobiles-mapper'

export function makeMobile(override: Partial<MobileProps> = {}, id?: UniqueEntityID) {
  const device = {
    serialNumber: faker.number.int().toString(),
    model: faker.commerce.productName(),
    acquisitionDate: faker.date.past({ years: 1 }),
    endWarrantyDate: faker.date.future({ years: 1 }),
    invoiceNumber: faker.number.int().toString(),
  }

  const mobile = Mobile.create(
    {
      name: faker.commerce.productName(),
      modelSlug: Slug.createFromText(device.model),
      type: faker.helpers.arrayElement(['tablet', 'cellphone']),
      operatingSystem: Slug.createFromText('Android'),
      ...device,
      ...override,
    },
    id,
  )

  return mobile
}

export class MobileFactory {
  constructor(private prisma: PrismaClient) {}

  async createMobile(data: Partial<MobileProps> = {}) {
    const mobile = makeMobile(data)

    await this.prisma.mobile.create({
      data: PrismaMobilesMapper.toPersistence(mobile),
    })

    return mobile
  }
}
