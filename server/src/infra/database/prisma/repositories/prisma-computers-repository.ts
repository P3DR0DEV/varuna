import { PrismaClient } from '@prisma/client'

import { ComputerRepository } from '@/domain/it-manager/application/repositories/computer-repository'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

export class PrismaComputersRepository implements ComputerRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Computer | null> {
    throw new Error('Method not implemented.')
  }

  async findMany(operatingSystem?: string): Promise<Computer[]> {
    throw new Error('Method not implemented.')
  }

  async findByHostname(hostname: string): Promise<Computer | null> {
    throw new Error('Method not implemented.')
  }

  async findByIpAddress(ipAddress: string): Promise<Computer | null> {
    throw new Error('Method not implemented.')
  }

  async create(computer: Computer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async save(computer: Computer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
