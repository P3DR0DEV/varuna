import { faker } from '@faker-js/faker'
import type { PrismaClient } from '@prisma/client'

import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Department, type DepartmentProps } from '@/domain/it-manager/enterprise/entities/department'
import { PrismaDepartmentMapper } from '@/infra/database/prisma/mappers/prisma-departments-mapper'

export function makeDepartment(override: Partial<DepartmentProps> = {}, id?: UniqueEntityID) {
  const department = Department.create(
    {
      name: faker.company.name(),
      description: faker.person.jobArea().concat(faker.lorem.words(3)),
      email: faker.internet.email(),
      ...override,
    },
    id,
  )

  return department
}

export class DepartmentFactory {
  constructor(private prisma: PrismaClient) {}

  async createDepartment(data: Partial<DepartmentProps> = {}) {
    const department = makeDepartment(data)

    await this.prisma.department.create({ data: PrismaDepartmentMapper.toPersistence(department) })

    return department
  }
}
