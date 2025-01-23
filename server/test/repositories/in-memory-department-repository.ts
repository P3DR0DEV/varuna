import type { DepartmentRepository } from '@/domain/it-manager/application/repositories/department-repository'
import type { Department } from '@/domain/it-manager/enterprise/entities/department'

export class InMemoryDepartmentRepository implements DepartmentRepository {
  public items: Department[] = []

  async create(department: Department): Promise<void> {
    this.items.push(department)
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(index, 1)
  }

  async findById(id: string): Promise<Department | null> {
    const department = this.items.find((item) => item.id.toString() === id)
    if (!department) {
      return null
    }
    return department
  }

  async findBySlug(slug: string): Promise<Department | null> {
    const department = this.items.find((item) => item.slug.value === slug)
    if (!department) {
      return null
    }
    return department
  }

  async findMany(): Promise<Department[]> {
    return this.items
  }

  async save(department: Department): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === department.id.toString())

    this.items[index] = department
  }
}
