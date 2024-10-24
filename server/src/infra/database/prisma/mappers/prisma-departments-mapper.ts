import { Department as PrismaDepartment, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

export class PrismaDepartmentMapper {
  static toDomain(raw: PrismaDepartment): Department {
    const id = new UniqueEntityID(raw.id)
    const chiefId = raw.chiefId ? new UniqueEntityID(raw.chiefId) : null
    const slug = Slug.createFromText(raw.slug)

    return Department.create(
      {
        description: raw.description,
        name: raw.name,
        chiefId,
        email: raw.email,
        slug,
      },
      id,
    )
  }

  static toPersistence(department: Department): Prisma.DepartmentUncheckedCreateInput {
    return {
      id: department.id.toString(),
      chiefId: department.chiefId?.toString(),
      description: department.description,
      name: department.name,
      slug: department.slug.value,
      email: department.email,
    }
  }
}
