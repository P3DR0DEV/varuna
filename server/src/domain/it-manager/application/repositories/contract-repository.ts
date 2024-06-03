import { Contract, ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'

export interface ContractRepository {
  findById(id: string): Promise<Contract | null>
  findByType(type: ContractTypes): Promise<Contract[]>
  findByUserEmail(userEmail: string): Promise<Contract[]>
  findMany(): Promise<Contract[]>

  create(contract: Contract): Promise<void>
  save(contract: Contract): Promise<void>
}
