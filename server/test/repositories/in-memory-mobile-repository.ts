import { MobileRepository } from '@/domain/it-manager/application/repositories/mobile-repository'
import { Mobile, MobileTypes } from '@/domain/it-manager/enterprise/entities/mobile'

export class InMemoryMobileRepository implements MobileRepository {
  public items: Mobile[] = []

  async findMany(type?: MobileTypes): Promise<Mobile[]> {
    if (type) {
      return this.items.filter((item) => item.type === type)
    }
    return this.items
  }

  async findById(id: string): Promise<Mobile | null> {
    const mobile = this.items.find((item) => item.id.toString() === id)
    if (!mobile) {
      return null
    }
    return mobile
  }

  async findByName(name: string): Promise<Mobile | null> {
    const mobile = this.items.find((item) => item.name === name)

    if (!mobile) {
      return null
    }
    return mobile
  }

  async findByDepartmentId(departmentId: string): Promise<Mobile[]> {
    const mobiles = this.items.filter((item) => item.departmentId?.toString() === departmentId)

    return mobiles
  }

  async create(mobile: Mobile): Promise<void> {
    this.items.push(mobile)
  }

  async save(mobile: Mobile): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === mobile.id.toString())

    this.items[index] = mobile
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(index, 1)
  }
}
