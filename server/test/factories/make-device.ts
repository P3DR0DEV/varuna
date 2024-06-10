import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

export function makeDevice(override: Partial<DeviceProps> = {}, id?: UniqueEntityID) {
  const device = Device.create(
    {
      serialNumber: faker.number.int().toString(),
      model: faker.commerce.productName(),
      invoiceNumber: faker.number.int().toString(),
      acquisitionDate: faker.date.past({ years: 1 }),
      endWarrantyDate: faker.date.future({ years: 1 }),
      ...override,
    },
    id,
  )

  return device
}
