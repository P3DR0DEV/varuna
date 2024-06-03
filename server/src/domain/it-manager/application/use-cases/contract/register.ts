import { UseCase } from '@/core/use-cases/use-case'
import { ContractRepository } from '../../repositories/contract-repository'
import { Contract, ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'
import { Either, success } from '@/core/types/either'

type RegisterContractRequest = {
  description: string
  type: ContractTypes
  userEmail: string
  fileName: string
  status?: 'active' | 'inactive'
  endsAt?: Date | null
  updatedAt?: Date | null
}

type RegisterContractResponse = Either<unknown, { contract: Contract }>

export class RegisterContractUseCase implements UseCase {
  constructor(private contractRepository: ContractRepository) {}

  async execute(props: RegisterContractRequest): Promise<RegisterContractResponse> {
    const contract = Contract.create(props)

    await this.contractRepository.create(contract)

    return success({ contract })
  }
}
