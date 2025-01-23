import type { Service, ServiceTypes } from '@/domain/it-manager/enterprise/entities/service'

export interface ServiceRepository {
  findMany(type?: ServiceTypes): Promise<Service[]>
  findById(id: string): Promise<Service | null>
  findByIpAddress(ipAddress: string): Promise<Service[]>

  create(service: Service): Promise<void>
  save(service: Service): Promise<void>
  delete(id: string): Promise<void>
}
