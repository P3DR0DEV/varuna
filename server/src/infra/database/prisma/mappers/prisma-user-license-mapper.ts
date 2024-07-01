import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { UserLicense } from "@/domain/it-manager/enterprise/entities/user-license"
import { Prisma, UserLicense as PrismaUserLicense } from "@prisma/client"


export class PrismaUserLicenseMapper {
  static toDomain(raw: PrismaUserLicense): UserLicense {
    const id = new UniqueEntityID(raw.id)
    const departmentId = new UniqueEntityID(raw.departmentId)
    const licenseId = new UniqueEntityID(raw.licenseId)
    const userId = new UniqueEntityID(raw.userId) 

    return UserLicense.create({
      departmentId,
      licenseId,
      userId,
    }, id)
  }

  static toPersistence(userLicense: UserLicense): Prisma.UserLicenseUncheckedCreateInput {
    return {
      id: userLicense.id.toString(),
      departmentId: userLicense.departmentId.toString(),
      licenseId: userLicense.licenseId.toString(),
      userId: userLicense.userId.toString(),
    }
  }
}