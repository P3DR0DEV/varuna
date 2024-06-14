import { Mobile, MobileTypes } from '@/domain/it-manager/enterprise/entities/mobile'

export interface MobileRepository {
  findMany(): Promise<Mobile[]>
  findById(id: string): Promise<Mobile | null>
  findByName(name: string): Promise<Mobile | null>
  findByType(type: MobileTypes): Promise<Mobile[]>
  findByDepartmentId(departmentId: string): Promise<Mobile[]>

  create(mobile: Mobile): Promise<void>
  save(mobile: Mobile): Promise<void>
  delete(id: string): Promise<void>
}
