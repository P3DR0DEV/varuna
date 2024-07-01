import { PrismaClient } from '@prisma/client'

import { ContractRepository } from '@/domain/it-manager/application/repositories/contract-repository'
import { Contract, ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'

import { MapContractType, PrismaContractsMapper } from '../mappers/prisma-contracts-mapper'

export class PrismaContractsRepository implements ContractRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Contract | null> {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
    })

    if (!contract) {
      return null
    }

    return PrismaContractsMapper.toDomain(contract)
  }

  async findByType(type: ContractTypes): Promise<Contract[]> {
    const persistenceType = MapContractType.toPersistence(type)

    const contracts = await this.prisma.contract.findMany({
      where: { type: persistenceType },
    })

    return contracts.map(PrismaContractsMapper.toDomain)
  }

  async findByUserEmail(userEmail: string): Promise<Contract[]> {
    const contracts = await this.prisma.contract.findMany({
      where: { userEmail },
    })

    return contracts.map(PrismaContractsMapper.toDomain)
  }

  async findMany(): Promise<Contract[]> {
    const contracts = await this.prisma.contract.findMany()

    return contracts.map(PrismaContractsMapper.toDomain)
  }

  async create(contract: Contract): Promise<void> {
    const data = PrismaContractsMapper.toPersistence(contract)

    await this.prisma.contract.create({
      data,
    })
  }

  async save(contract: Contract): Promise<void> {
    const data = PrismaContractsMapper.toPersistence(contract)

    await this.prisma.contract.update({
      where: { id: data.id },
      data,
    })
  }
}
