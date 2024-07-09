import { PrismaClient } from '@prisma/client'

import { MobileRepository } from '@/domain/it-manager/application/repositories/mobile-repository'
import { Mobile, MobileTypes } from '@/domain/it-manager/enterprise/entities/mobile'

import { MapMobileType, PrismaMobilesMapper } from '../mappers/prisma-mobiles-mapper'

export class PrismaMobilesRepository implements MobileRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(type?: MobileTypes): Promise<Mobile[]> {
    const mobiles = await this.prisma.mobile.findMany({
      where: { type: type && MapMobileType.toPersistence(type) },
    })

    return mobiles.map(PrismaMobilesMapper.toDomain)
  }

  async findById(id: string): Promise<Mobile | null> {
    const mobile = await this.prisma.mobile.findUnique({ where: { id } })

    if (!mobile) {
      return null
    }

    return PrismaMobilesMapper.toDomain(mobile)
  }

  async findByName(name: string): Promise<Mobile | null> {
    const mobile = await this.prisma.mobile.findUnique({ where: { name } })

    if (!mobile) {
      return null
    }

    return PrismaMobilesMapper.toDomain(mobile)
  }

  async findByDepartmentId(departmentId: string): Promise<Mobile[]> {
    const mobiles = await this.prisma.mobile.findMany({
      where: { departmentId },
    })

    return mobiles.map(PrismaMobilesMapper.toDomain)
  }

  async create(mobile: Mobile): Promise<void> {
    const data = PrismaMobilesMapper.toPersistence(mobile)

    await this.prisma.mobile.create({ data })
  }

  async save(mobile: Mobile): Promise<void> {
    const data = PrismaMobilesMapper.toPersistence(mobile)

    await this.prisma.mobile.update({ where: { id: data.id }, data })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.mobile.delete({ where: { id } })
  }
}
