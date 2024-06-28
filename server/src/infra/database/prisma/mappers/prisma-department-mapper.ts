import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Department } from "@/domain/it-manager/enterprise/entities/department";
import { Slug } from "@/domain/it-manager/enterprise/entities/value-objects/slug";
import { Prisma, Department as PrismaDepartment } from "@prisma/client";


export class PrismaDepartmentMapper {
  static toDomain(raw: PrismaDepartment): Department {
    const chiefId = raw.chiefId ? new UniqueEntityID(raw.chiefId) : null
    const slug = Slug.createFromText(raw.slug) 

    return Department.create({
      description: raw.description,
      name: raw.name,
      chiefId,
      email: raw.email,
      slug
    }, new UniqueEntityID(raw.id))
  }

  static toPersistence(department: Department): Prisma.DepartmentUncheckedCreateInput {
    return {
      id: department.id.toString(),
      chiefId: department.chiefId?.toString(),
      description: department.description,
      name: department.name,
      slug: department.slug.value,
      email: department.email
    }
  }
}