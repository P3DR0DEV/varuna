import { Department } from '@/domain/it-manager/enterprise/entities/department'

export interface DepartmentRepository {
  findMany(): Promise<Department[]>
  findBySlug(slug: string): Promise<Department | null>
  findById(id: string): Promise<Department | null>

  create(department: Department): Promise<void>
  save(department: Department): Promise<void>
  delete(id: string): Promise<void>
}
