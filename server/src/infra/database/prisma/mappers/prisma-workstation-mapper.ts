import { Prisma, Workstation as PrismaWorkstation } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

export class PrismaWorkstationMapper {
  static toDomain(raw: PrismaWorkstation): Workstation {
    const id = new UniqueEntityID(raw.id)
    const departmentId = new UniqueEntityID(raw.departmentId)
    const computerId = new UniqueEntityID(raw.computerId)

    return Workstation.create(
      {
        computerId,
        departmentId,
      },
      id,
    )
  }

  static toPersistence(workstation: Workstation): Prisma.WorkstationUncheckedCreateInput {
    return {
      id: workstation.id.toString(),
      departmentId: workstation.departmentId.toString(),
      computerId: workstation.computerId.toString(),
    }
  }
}
