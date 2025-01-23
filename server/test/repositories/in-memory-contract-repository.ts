import type { ContractRepository } from '@/domain/it-manager/application/repositories/contract-repository'
import type { Contract, ContractStatus, ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'

export class InMemoryContractRepository implements ContractRepository {
  public items: Contract[] = []

  async editContractStatus({ id, status }: { id: string; status: ContractStatus }): Promise<null | Contract> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    if (index < 0) {
      return null
    }

    this.items[index].status = status

    return this.items[index]
  }

  async findById(id: string): Promise<Contract | null> {
    const contract = this.items.find((item) => item.id.toString() === id)
    if (!contract) {
      return null
    }
    return contract
  }

  async findMany({ userEmail, type }: { userEmail?: string; type?: ContractTypes }): Promise<Contract[]> {
    if (userEmail && type) {
      return this.items.filter((item) => item.userEmail === userEmail && item.type === type)
    }

    if (userEmail) {
      return this.items.filter((item) => item.userEmail === userEmail)
    }

    if (type) {
      return this.items.filter((item) => item.type === type)
    }

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
