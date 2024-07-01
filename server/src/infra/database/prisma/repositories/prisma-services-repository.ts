import { PrismaClient } from '@prisma/client'

import { ServiceRepository } from '@/domain/it-manager/application/repositories/service-repository'
import { Service, ServiceTypes } from '@/domain/it-manager/enterprise/entities/service'

import { MapServiceType, PrismaServiceMapper } from '../mappers/prisma-services-mapper'

export class PrismaServicesRepository implements ServiceRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(): Promise<Service[]> {
    const services = await this.prisma.service.findMany()

    return services.map(PrismaServiceMapper.toDomain)
  }

  async findById(id: string): Promise<Service | null> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    })

    if (!service) {
      return null
    }

    return PrismaServiceMapper.toDomain(service)
  }

  async findByType(type: ServiceTypes): Promise<Service[]> {
    const persistenceType = MapServiceType.toPersistence(type)

    const services = await this.prisma.service.findMany({
      where: { type: persistenceType },
    })

    return services.map(PrismaServiceMapper.toDomain)
  }

  async findByIpAddress(ipAddress: string): Promise<Service[]> {
    const services = await this.prisma.service.findMany({
      where: { ipAddress },
    })

    return services.map(PrismaServiceMapper.toDomain)
  }

  async create(service: Service): Promise<void> {
    const data = PrismaServiceMapper.toPersistence(service)

    await this.prisma.service.create({ data })
  }

  async save(service: Service): Promise<void> {
    const data = PrismaServiceMapper.toPersistence(service)

    await this.prisma.service.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.service.delete({ where: { id } })
  }
}
