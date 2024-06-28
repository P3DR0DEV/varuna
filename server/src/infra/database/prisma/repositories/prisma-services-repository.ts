import { PrismaClient } from '@prisma/client'

import { ServiceRepository } from '@/domain/it-manager/application/repositories/service-repository'
import { Service, ServiceTypes } from '@/domain/it-manager/enterprise/entities/service'

export class PrismaServicesRepository implements ServiceRepository {
  constructor(private prisma: PrismaClient) {}

  findMany(): Promise<Service[]> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Service | null> {
    throw new Error('Method not implemented.')
  }

  findByType(type: ServiceTypes): Promise<Service[]> {
    throw new Error('Method not implemented.')
  }

  findByIpAddress(ipAddress: string): Promise<Service[]> {
    throw new Error('Method not implemented.')
  }

  create(service: Service): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(service: Service): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
