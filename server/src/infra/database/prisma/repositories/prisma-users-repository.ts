import type { PrismaClient } from '@prisma/client'

import type { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import type { User } from '@/domain/it-manager/enterprise/entities/user'

import { PrismaUsersMapper } from '../mappers/prisma-users-mapper'

export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users.map(PrismaUsersMapper.toDomain)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return null
    }

    return PrismaUsersMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return PrismaUsersMapper.toDomain(user)
  }

  async findByBadge(badge: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { badge },
    })

    if (!user) {
      return null
    }

    return PrismaUsersMapper.toDomain(user)
  }

  async findManyByDepartment(departmentId: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { departmentId },
    })

    return users.map(PrismaUsersMapper.toDomain)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUsersMapper.toPersistence(user)

    await this.prisma.user.create({
      data,
    })
  }

  async save(user: User): Promise<void> {
    const data = PrismaUsersMapper.toPersistence(user)

    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
