import type { User } from '@/domain/it-manager/enterprise/entities/user'

export interface UsersRepository {
  findMany(): Promise<User[]>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByBadge(badge: string): Promise<User | null>
  findManyByDepartment(departmentId: string): Promise<User[]>

  create(user: User): Promise<void>
  save(user: User): Promise<void>
  delete(id: string): Promise<void>
}
