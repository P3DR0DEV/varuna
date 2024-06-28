import { PrismaClient } from '@prisma/client'

import { MobileRepository } from '@/domain/it-manager/application/repositories/mobile-repository'
import { Mobile, MobileTypes } from '@/domain/it-manager/enterprise/entities/mobile'

export class PrismaMobilesRepository implements MobileRepository {
  constructor(private prisma: PrismaClient) {}

  findMany(): Promise<Mobile[]> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Mobile | null> {
    throw new Error('Method not implemented.')
  }

  findByName(name: string): Promise<Mobile | null> {
    throw new Error('Method not implemented.')
  }

  findByType(type: MobileTypes): Promise<Mobile[]> {
    throw new Error('Method not implemented.')
  }

  findByDepartmentId(departmentId: string): Promise<Mobile[]> {
    throw new Error('Method not implemented.')
  }

  create(mobile: Mobile): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(mobile: Mobile): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
