import type { PrismaClient } from '@prisma/client'

import type { ContractRepository } from '@/domain/it-manager/application/repositories/contract-repository'
import type { Contract, ContractStatus, ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'

import { MapContractStatus, MapContractType, PrismaContractsMapper } from '../mappers/prisma-contracts-mapper'

export class PrismaContractsRepository implements ContractRepository {
  constructor(private prisma: PrismaClient) {}

  async editContractStatus({ id, status }: { id: string; status: ContractStatus }): Promise<null | Contract> {
    const contract = await this.prisma.contract.update({
      where: { id },
      data: {
        status: MapContractStatus.toPersistence(status),
      },
    })

    if (!contract) {
      return null
    }

    return PrismaContractsMapper.toDomain(contract)
  }

  async findById(id: string): Promise<Contract | null> {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
    })

    if (!contract) {
      return null
    }

    return PrismaContractsMapper.toDomain(contract)
  }

  async findMany({ userEmail, type }: { userEmail?: string; type?: ContractTypes }): Promise<Contract[]> {
    const contracts = await this.prisma.contract.findMany({
      where: {
        userEmail,
        type: type ? MapContractType.toPersistence(type) : undefined,
      },
    })

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
