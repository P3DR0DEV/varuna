import { PrismaClient } from '@prisma/client'

import { LicenseRepository } from '@/domain/it-manager/application/repositories/license-repository'
import { License } from '@/domain/it-manager/enterprise/entities/license'

import { PrismaLicensesMapper } from '../mappers/prisma-licenses-mapper'

export class PrismaLicensesRepository implements LicenseRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<License | null> {
    const license = await this.prisma.license.findUnique({ where: { id } })

    if (!license) {
      return null
    }

    return PrismaLicensesMapper.toDomain(license)
  }

  async findMany(enterpriseName?: string): Promise<License[]> {
    const licenses = await this.prisma.license.findMany({
      where: { enterpriseName },
    })

    return licenses.map(PrismaLicensesMapper.toDomain)
  }

  async findByName(licenseName: string): Promise<License | null> {
    const license = await this.prisma.license.findUnique({
      where: { name: licenseName },
    })

    if (!license) {
      return null
    }

    return PrismaLicensesMapper.toDomain(license)
  }

  async create(license: License): Promise<void> {
    const data = PrismaLicensesMapper.toPersistence(license)

    await this.prisma.license.create({ data })
  }

  async save(license: License): Promise<void> {
    const data = PrismaLicensesMapper.toPersistence(license)

    await this.prisma.license.update({ where: { id: data.id }, data })
  }
}
