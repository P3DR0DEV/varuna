import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Service, ServiceProps } from '@/domain/it-manager/enterprise/entities/service'

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
