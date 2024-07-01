import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserLicense, UserLicenseProps } from '@/domain/it-manager/enterprise/entities/user-license'
import { PrismaUserLicenseMapper } from '@/infra/database/prisma/mappers/prisma-user-license-mapper'
import { PrismaClient } from '@prisma/client'

export function makeUserLicense(override: Partial<UserLicenseProps> = {}, id?: UniqueEntityID) {
  const userLicense = UserLicense.create(
    {
      userId: new UniqueEntityID(),
      licenseId: new UniqueEntityID(),
      departmentId: new UniqueEntityID(),
      ...override,
    },
    id,
    )
    
    return userLicense
  }
  

export class UserLicenseFactory {
  constructor(private prisma: PrismaClient) {}

  async createUserLicense(data: Partial<UserLicenseProps> = {}) {
    const userLicense = makeUserLicense(data)

    await this.prisma.userLicense.create({
      data: PrismaUserLicenseMapper.toPersistence(userLicense),
    })
    
    return userLicense
  }
}