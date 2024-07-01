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

  async findBySlug(slug: string): Promise<Department | null> {
    const department = await this.prisma.department.findUnique({ where: { slug } })

    if (!department) {
      return null
    }

    return PrismaDepartmentMapper.toDomain(department)
  }

  async findById(id: string): Promise<Department | null> {
    const department = await this.prisma.department.findUnique({ where: { id } })

    if (!department) {
      return null
    }

    return PrismaDepartmentMapper.toDomain(department)
  }

  async create(department: Department): Promise<void> {
    const data = PrismaDepartmentMapper.toPersistence(department)

    await this.prisma.department.create({ data })
  }

  async save(department: Department): Promise<void> {
    const data = PrismaDepartmentMapper.toPersistence(department)

    await this.prisma.department.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.department.delete({ where: { id } })
  }
}
