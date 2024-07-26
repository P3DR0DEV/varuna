import { Prisma, User as PrismaUser } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/it-manager/enterprise/entities/user'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'

export class PrismaUsersMapper {
  static toDomain(raw: PrismaUser): User {
    const departmentId = new UniqueEntityID(raw.departmentId)
    const workstationId = raw.workstationId ? new UniqueEntityID(raw.workstationId) : null
    const phone = raw.phone ? Phone.format(raw.phone) : null

    return User.create(
      {
        name: raw.name,
        email: raw.email,
        badge: raw.badge,
        phone,
        workstationId,
        departmentId,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      badge: user.badge,
      phone: user.phone?.value,
      workstationId: user.workstationId?.toString(),
      departmentId: user.departmentId?.toString(),
    }
  }
}
