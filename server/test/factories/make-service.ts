import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Service, ServiceProps } from '@/domain/it-manager/enterprise/entities/service'
import { PrismaServiceMapper } from '@/infra/database/prisma/mappers/prisma-services-mapper'

export function makeService(override: Partial<ServiceProps> = {}, id?: UniqueEntityID) {
  const service = Service.create(
    {
      name: faker.internet.domainName(),
      ipAddress: faker.internet.ipv4(),
      description: faker.internet.userAgent(),
      port: faker.number.int({ min: 1, max: 65535 }),
      type: faker.helpers.arrayElement(['application', 'database', 'infra']),
      ...override,
    },
    id,
  )

  return service
}

export class ServiceFactory {
  constructor(private prisma: PrismaClient) {}

  async createService(data: Partial<ServiceProps> = {}) {
    const service = makeService(data)

    await this.prisma.service.create({
      data: PrismaServiceMapper.toPersistence(service),
    })

    return service
  }
}
