import { PrismaClient } from '@prisma/client'

import { ContractRepository } from '@/domain/it-manager/application/repositories/contract-repository'
import { Contract, ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'

export class PrismaContractsRepository implements ContractRepository {
  constructor(private prisma: PrismaClient) {}

  findById(id: string): Promise<Contract | null> {
    throw new Error('Method not implemented.')
  }

  findByType(type: ContractTypes): Promise<Contract[]> {
    throw new Error('Method not implemented.')
  }

  findByUserEmail(userEmail: string): Promise<Contract[]> {
    throw new Error('Method not implemented.')
  }

  findMany(): Promise<Contract[]> {
    throw new Error('Method not implemented.')
  }

  create(contract: Contract): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(contract: Contract): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
