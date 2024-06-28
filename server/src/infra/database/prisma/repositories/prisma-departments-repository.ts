import { PrismaClient } from '@prisma/client'

import { DepartmentRepository } from '@/domain/it-manager/application/repositories/department-repository'
import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { PrismaDepartmentMapper } from '../mappers/prisma-department-mapper'

export class PrismaDepartmentsRepository implements DepartmentRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(): Promise<Department[]> {
    const departments = await this.prisma.department.findMany()

    return departments.map(PrismaDepartmentMapper.toDomain)
  }

  findBySlug(slug: string): Promise<Department | null> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Department | null> {
    throw new Error('Method not implemented.')
  }

  create(department: Department): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(department: Department): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
