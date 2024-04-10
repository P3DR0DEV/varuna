import { ServiceRepository } from '@/domain/it-manager/application/repositories/service-repository'
import { Service, ServiceTypes } from '@/domain/it-manager/enterprise/entities/service'

export class InMemoryServiceRepository implements ServiceRepository {
  public items: Service[] = []

  async findMany(): Promise<Service[]> {
    return this.items
  }

  async findByName(serviceName: string): Promise<Service | null> {
    const service = this.items.find((item) => item.name === serviceName)
    if (!service) {
      return null
    }
    return service
  }

  async findById(id: string): Promise<Service | null> {
    const service = this.items.find((item) => item.id.toString() === id)
    if (!service) {
      return null
    }
    return service
  }

  async findByType(type: ServiceTypes): Promise<Service[]> {
    const services = this.items.filter((item) => item.type === type)
    return services
  }

  async findByIpAddress(ipAddress: string): Promise<Service | null> {
    const service = this.items.find((item) => item.ipAddress === ipAddress)
    if (!service) {
      return null
    }
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
