import { PrismaClient } from '@prisma/client'

import { WorkstationRepository } from '@/domain/it-manager/application/repositories/workstation-repository'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

export class PrismaWorkstationRepository implements WorkstationRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(): Promise<Workstation[]> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<Workstation | null> {
    throw new Error('Method not implemented.')
  }

  async findByComputerId(computerId: string): Promise<Workstation | null> {
    throw new Error('Method not implemented.')
  }

  async create(workstation: Workstation): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async save(workstation: Workstation): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
