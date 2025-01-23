import type { CONTRACT_TYPES, DATA_STATUS, Prisma, Contract as PrismaContract } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Contract, type ContractStatus, type ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'

export class PrismaContractsMapper {
  static toDomain(contract: PrismaContract): Contract {
    const id = new UniqueEntityID(contract.id)
    const type = MapContractType.toDomain(contract.type)
    const status = MapContractStatus.toDomain(contract.status)

    return Contract.create(
      {
        description: contract.description,
        fileName: contract.fileName,
        type,
        userEmail: contract.userEmail,
        endsAt: contract.endsAt,
        status,
      },
      id,
    )
  }

  static toPersistence(contract: Contract): Prisma.ContractUncheckedCreateInput {
    const type = MapContractType.toPersistence(contract.type)
    const status = MapContractStatus.toPersistence(contract.status)

    return {
      id: contract.id.toString(),
      description: contract.description,
      fileName: contract.fileName,
      type,
      userEmail: contract.userEmail,
      endsAt: contract.endsAt,
      status,
    }
  }
}

export class MapContractType {
  static toDomain(type: CONTRACT_TYPES): ContractTypes {
    switch (type) {
      case 'BORROWING':
        return 'borrowing'
      case 'RENTING':
        return 'renting'
      default:
        return 'borrowing'
    }
  }

  static toPersistence(type: ContractTypes): CONTRACT_TYPES {
    switch (type) {
      case 'borrowing':
        return 'BORROWING'
      case 'renting':
        return 'RENTING'
      default:
        return 'BORROWING'
    }
  }
}

export class MapContractStatus {
  static toDomain(status: DATA_STATUS): ContractStatus {
    switch (status) {
      case 'ACTIVE':
        return 'active'
      case 'INACTIVE':
        return 'inactive'
      default:
        return 'active'
    }
  }

  static toPersistence(status: ContractStatus): DATA_STATUS {
    switch (status) {
      case 'active':
        return 'ACTIVE'
      case 'inactive':
        return 'INACTIVE'
      default:
        return 'ACTIVE'
    }
  }
}
