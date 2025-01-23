import { type Either, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import { Contract, type ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'

import type { ContractRepository } from '../../repositories/contract-repository'

type CreateContractUseCaseProps = {
  description: string
  type: ContractTypes
  userEmail: string
  fileName: string
  status?: 'active' | 'inactive' | null
  endsAt?: Date | null
  updatedAt?: Date | null
}

type CreateContractUseCaseResponse = Either<unknown, { contract: Contract }>

export class CreateContractUseCase implements UseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(props: CreateContractUseCaseProps): Promise<CreateContractUseCaseResponse> {
    const contract = Contract.create({ ...props, status: props.status ?? 'active' })

    await this.contractRepository.create(contract)

    return success({ contract })
  }
}
