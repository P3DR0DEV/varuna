import type { ServiceRepository } from '@/domain/it-manager/application/repositories/service-repository'
import type { Service, ServiceTypes } from '@/domain/it-manager/enterprise/entities/service'

export class InMemoryServiceRepository implements ServiceRepository {
  public items: Service[] = []

  async findMany(type?: ServiceTypes): Promise<Service[]> {
    if (type) {
      return this.items.filter((item) => item.type === type)
    }

    return this.items
  }

  async findById(id: string): Promise<Service | null> {
    const service = this.items.find((item) => item.id.toString() === id)
    if (!service) {
      return null
    }
    return service
  }

  async findByIpAddress(ipAddress: string): Promise<Service[]> {
    const service = this.items.filter((item) => item.ipAddress === ipAddress)

    return service
  }

  async create(service: Service): Promise<void> {
    this.items.push(service)
  }

  async save(service: Service): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === service.id)

    this.items[itemIndex] = service
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(index, 1)
  }
}
