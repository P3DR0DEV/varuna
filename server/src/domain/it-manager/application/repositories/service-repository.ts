import { Service, ServiceTypes } from '@/domain/it-manager/enterprise/entities/service'

export interface ServiceRepository {
  findMany(): Promise<Service[]>
  findByName(serviceName: string): Promise<Service | null>
  findById(id: string): Promise<Service | null>
  findByType(type: ServiceTypes): Promise<Service[]>
  findByIpAddress(ipAddress: string): Promise<Service | null>

  create(service: Service): Promise<void>
  save(service: Service): Promise<void>
  delete(id: string): Promise<void>
}
