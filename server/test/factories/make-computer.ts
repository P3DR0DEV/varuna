import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Computer, ComputerProps } from '@/domain/it-manager/enterprise/entities/computer'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'
import { PrismaComputerMapper } from '@/infra/database/prisma/mappers/prisma-computers-mapper'

export function makeComputer(override: Partial<ComputerProps> = {}, id?: UniqueEntityID) {
  const device = {
    serialNumber: faker.number.int().toString(),
    model: faker.commerce.productName(),
    acquisitionDate: faker.date.past({ years: 1 }),
    endWarrantyDate: faker.date.future({ years: 1 }),
    invoiceNumber: faker.number.int().toString(),
  }

  const computer = Computer.create(
    {
      hostname: faker.internet.domainName(),
      ipAddress: faker.internet.ip(),
      description: faker.commerce.productDescription(),
      operatingSystem: Slug.createFromText('Windows XP'),
      type: faker.helpers.arrayElement(['desktop', 'server', 'notebook']),
      ...device,
      ...override,
    },
    id,
  )

  return computer
}

export class ComputerFactory {
  constructor(private prisma: PrismaClient) {}

  async createPrismaComputer(data: Partial<ComputerProps> = {}) {
    const computer = makeComputer(data)

    await this.prisma.computer.create({ data: PrismaComputerMapper.toPersistence(computer) })

    return computer
  }
}
