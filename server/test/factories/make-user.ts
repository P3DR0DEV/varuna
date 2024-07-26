import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/it-manager/enterprise/entities/user'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'
import { PrismaUsersMapper } from '@/infra/database/prisma/mappers/prisma-users-mapper'

export function makeUser(override: Partial<UserProps> = {}, id?: UniqueEntityID) {
  const phoneNumber = String('(11)')
    .concat(' ', faker.number.int().toString().substring(0, 5))
    .concat('-', faker.number.int().toString().substring(0, 4))

  const user = User.create(
    {
      departmentId: null,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: Phone.format(phoneNumber),
      badge: faker.number.int().toString().substring(0, 6),
      workstationId: null,
      ...override,
    },
    id,
  )

  return user
}

export class UserFactory {
  constructor(private prisma: PrismaClient) {}

  async createUser(data: Partial<UserProps> = {}) {
    const user = makeUser(data)

    await this.prisma.user.create({
      data: PrismaUsersMapper.toPersistence(user),
    })

    return user
  }
}
