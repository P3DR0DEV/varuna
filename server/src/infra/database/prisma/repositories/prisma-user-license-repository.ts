import { PrismaClient } from '@prisma/client'

import { UserLicenseRepository } from '@/domain/it-manager/application/repositories/user-license-repository'
import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

import { PrismaUserLicenseMapper } from '../mappers/prisma-user-license-mapper'

export class PrismaUserLicenseRepository implements UserLicenseRepository {
  constructor(private prisma: PrismaClient) {}

  async findByUserId(userId: string): Promise<UserLicense[]> {
    const userLicenses = await this.prisma.userLicense.findMany({
      where: {
        userId,
      },
    })

    return userLicenses.map(PrismaUserLicenseMapper.toDomain)
  }

  async findByLicenseId(licenseId: string): Promise<UserLicense | null> {
    const userLicense = await this.prisma.userLicense.findUnique({
      where: { licenseId },
    })

    if (!userLicense) {
      return null
    }

    return PrismaUserLicenseMapper.toDomain(userLicense)
  }

  async findById(id: string): Promise<UserLicense | null> {
    const userLicense = await this.prisma.userLicense.findUnique({
      where: { id },
    })

    if (!userLicense) {
      return null
    }

    return PrismaUserLicenseMapper.toDomain(userLicense)
  }

  async create(userLicense: UserLicense): Promise<void> {
    const data = PrismaUserLicenseMapper.toPersistence(userLicense)

    await this.prisma.userLicense.create({ data })
  }

  async save(userLicense: UserLicense): Promise<void> {
    const data = PrismaUserLicenseMapper.toPersistence(userLicense)

    await this.prisma.userLicense.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userLicense.delete({ where: { id } })
  }
}
