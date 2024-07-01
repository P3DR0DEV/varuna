import { PrismaClient } from '@prisma/client'

import { WorkstationRepository } from '@/domain/it-manager/application/repositories/workstation-repository'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

import { PrismaWorkstationMapper } from '../mappers/prisma-workstation-mapper'

export class PrismaWorkstationRepository implements WorkstationRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(): Promise<Workstation[]> {
    const workstations = await this.prisma.workstation.findMany()

    return workstations.map(PrismaWorkstationMapper.toDomain)
  }

  async findById(id: string): Promise<Workstation | null> {
    const workstation = await this.prisma.workstation.findUnique({
      where: { id },
    })

    if (!workstation) {
      return null
    }

    return PrismaWorkstationMapper.toDomain(workstation)
  }

  async findByComputerId(computerId: string): Promise<Workstation | null> {
    const workstation = await this.prisma.workstation.findUnique({
      where: { computerId },
    })

    if (!workstation) {
      return null
    }

    return PrismaWorkstationMapper.toDomain(workstation)
  }

  async create(workstation: Workstation): Promise<void> {
    const data = PrismaWorkstationMapper.toPersistence(workstation)

    await this.prisma.workstation.create({ data })
  }

  async save(workstation: Workstation): Promise<void> {
    const data = PrismaWorkstationMapper.toPersistence(workstation)

    await this.prisma.workstation.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.workstation.delete({ where: { id } })
  }
}
