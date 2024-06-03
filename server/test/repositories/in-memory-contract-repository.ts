import { ContractRepository } from '@/domain/it-manager/application/repositories/contract-repository'
import { Contract, ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'

export class InMemoryContractRepository implements ContractRepository {
  public items: Contract[] = []

  async findById(id: string): Promise<Contract | null> {
    const contract = this.items.find((item) => item.id.toString() === id)
    if (!contract) {
      return null
    }
    return contract
  }

  async findByType(type: ContractTypes): Promise<Contract[]> {
    const contract = this.items.filter((item) => item.type === type)

    return contract
  }

  async findByUserEmail(userEmail: string): Promise<Contract[]> {
    const contract = this.items.filter((item) => item.userEmail === userEmail)

    return contract
  }

  async findMany(): Promise<Contract[]> {
    return this.items
  }

  async create(contract: Contract): Promise<void> {
    this.items.push(contract)
  }

  async save(contract: Contract): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === contract.id.toString())

    this.items[index] = contract
  }
}
