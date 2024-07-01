import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'
import { PrismaDevicesMapper } from '@/infra/database/prisma/mappers/prisma-devices-mapper'

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

export class DeviceFactory {
  constructor(private prisma: PrismaClient) {}

  async createDevice(data: Partial<DeviceProps> = {}) {
    const device = makeDevice(data)

    await this.prisma.device.create({ data: PrismaDevicesMapper.toPersistence(device) })

    return device
  }
}
