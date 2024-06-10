import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Mobile, MobileProps } from '@/domain/it-manager/enterprise/entities/mobile'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

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
      departmentId: new UniqueEntityID(),
      type: 'cellphone',
      operatingSystem: Slug.createFromText('Android'),
      ...device,
      ...override,
    },
    id,
  )

  return mobile
}
