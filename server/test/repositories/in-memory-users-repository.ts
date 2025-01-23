import type { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import type { User } from '@/domain/it-manager/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(index, 1)
  }

  async findByBadge(badge: string): Promise<User | null> {
    const user = this.items.find((item) => item.badge === badge)

    if (!user) {
      return null
    }
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id)
    if (!user) {
      return null
    }
    return user
  }

  async findMany(): Promise<User[]> {
    return this.items
  }

  async findManyByDepartment(departmentId: string): Promise<User[]> {
    return this.items.filter((item) => item.departmentId.toString() === departmentId)
  }

  async save(user: User): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === user.id.toString())

    this.items[index] = user
  }
}
