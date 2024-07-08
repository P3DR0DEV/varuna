import { Contract, ContractStatus, ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'

export interface ContractRepository {
  findById(id: string): Promise<Contract | null>
  findMany({ userEmail, type }: { userEmail?: string; type?: ContractTypes }): Promise<Contract[]>
  editContractStatus({ id, status }: { id: string; status: ContractStatus }): Promise<null | Contract>

  create(contract: Contract): Promise<void>
  save(contract: Contract): Promise<void>
}
