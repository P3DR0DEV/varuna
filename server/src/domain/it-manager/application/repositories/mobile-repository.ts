import { Mobile, MobileTypes } from '@/domain/it-manager/enterprise/entities/mobile'

export interface MobileRepository {
  findMany(type?: MobileTypes | null): Promise<Mobile[]>
  findById(id: string): Promise<Mobile | null>
  findByName(name: string): Promise<Mobile | null>
  findByDepartmentId(departmentId: string): Promise<Mobile[]>
  findByTag(tag: string): Promise<Mobile | null>

  create(mobile: Mobile): Promise<void>
  save(mobile: Mobile): Promise<void>
  delete(id: string): Promise<void>
}
