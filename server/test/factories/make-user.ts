import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/it-manager/enterprise/entities/user'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'

export function makeUser(override: Partial<UserProps> = {}, id?: UniqueEntityID) {
  const phoneNumber = String('(11)')
    .concat(' ', faker.number.int().toString().substring(0, 5))
    .concat('-', faker.number.int().toString().substring(0, 4))

  const user = User.create(
    {
      departmentId: new UniqueEntityID(),
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
