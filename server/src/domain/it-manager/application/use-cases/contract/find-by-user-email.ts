import { UseCase } from '@/core/use-cases/use-case'
import { ContractRepository } from '../../repositories/contract-repository'
import { Either, success } from '@/core/types/either'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'

type FindByUserEmailResponse = Either<unknown, { contracts: Contract[] }>

export class FindByUserEmailUseCase implements UseCase {
  constructor(private contractRepository: ContractRepository) {}

  async execute(userEmail: string): Promise<FindByUserEmailResponse> {
    const contracts = await this.contractRepository.findByUserEmail(userEmail)

    return success({ contracts })
  }
}
