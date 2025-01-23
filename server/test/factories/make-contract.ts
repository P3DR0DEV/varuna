import { faker } from '@faker-js/faker'
import type { PrismaClient } from '@prisma/client'

import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Contract, type ContractProps } from '@/domain/it-manager/enterprise/entities/contract'
import { PrismaContractsMapper } from '@/infra/database/prisma/mappers/prisma-contracts-mapper'

export function makeContract(override: Partial<ContractProps> = {}, id?: UniqueEntityID) {
  const contract = Contract.create(
    {
      fileName: faker.system.commonFileName(),
      description: faker.commerce.productDescription(),
      userEmail: faker.internet.email(),
      endsAt: faker.date.future(),
      type: faker.helpers.arrayElement(['renting', 'borrowing']),
      ...override,
    },
    id,
  )

  return contract
}

export class ContractFactory {
  constructor(private prisma: PrismaClient) {}

  async createContract(data: Partial<ContractProps> = {}) {
    const contract = makeContract(data)

    await this.prisma.contract.create({ data: PrismaContractsMapper.toPersistence(contract) })

    return contract
  }
}
