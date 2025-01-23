import { type Either, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Contract, ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'

import type { ContractRepository } from '../../repositories/contract-repository'

type FetchAllContractsUseCaseResponse = Either<unknown, { contracts: Contract[] }>

export class FetchAllContractsUseCase implements UseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute({
    userEmail,
    type,
  }: {
    userEmail?: string
    type?: ContractTypes
  }): Promise<FetchAllContractsUseCaseResponse> {
    const contracts = await this.contractRepository.findMany({ userEmail, type })

    return success({ contracts })
  }
}
