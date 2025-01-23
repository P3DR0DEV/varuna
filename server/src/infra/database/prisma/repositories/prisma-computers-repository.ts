import type { PrismaClient } from '@prisma/client'

import type { ComputerRepository } from '@/domain/it-manager/application/repositories/computer-repository'
import type { Computer } from '@/domain/it-manager/enterprise/entities/computer'

import { PrismaComputerMapper } from '../mappers/prisma-computers-mapper'

export class PrismaComputersRepository implements ComputerRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Computer | null> {
    const computer = await this.prisma.computer.findUnique({
      where: { id },
    })

    if (!computer) {
      return null
    }

    return PrismaComputerMapper.toDomain(computer)
  }

  async findByTag(tag: string): Promise<Computer | null> {
    const computer = await this.prisma.computer.findUnique({
      where: { tag },
    })

    if (!computer) {
      return null
    }

    return PrismaComputerMapper.toDomain(computer)
  }

  async findMany(operatingSystem?: string): Promise<Computer[]> {
    const computers = await this.prisma.computer.findMany({
      where: { operatingSystem },
    })

    return computers.map(PrismaComputerMapper.toDomain)
  }

  async findByHostname(hostname: string): Promise<Computer | null> {
    const computer = await this.prisma.computer.findUnique({
      where: { hostname },
    })

    if (!computer) {
      return null
    }

    return PrismaComputerMapper.toDomain(computer)
  }

  async findByIpAddress(ipAddress: string): Promise<Computer | null> {
    const computer = await this.prisma.computer.findUnique({
      where: { ipAddress },
    })

    if (!computer) {
      return null
    }

    return PrismaComputerMapper.toDomain(computer)
  }

  async create(computer: Computer): Promise<void> {
    const data = PrismaComputerMapper.toPersistence(computer)

    await this.prisma.computer.create({ data })
  }

  async save(computer: Computer): Promise<void> {
    const data = PrismaComputerMapper.toPersistence(computer)

    await this.prisma.computer.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.computer.delete({ where: { id } })
  }
}
