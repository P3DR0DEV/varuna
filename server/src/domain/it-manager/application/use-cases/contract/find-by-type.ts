import { UseCase } from '@/core/use-cases/use-case'
import { ContractRepository } from '../../repositories/contract-repository'
import { Either, success } from '@/core/types/either'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'

type FindByTypeResponse = Either<unknown, { contracts: Contract[] }>

export class FindByTypeUseCase implements UseCase {
  constructor(private contractRepository: ContractRepository) {}

  async execute(type: 'renting' | 'borrowing'): Promise<FindByTypeResponse> {
    const contracts = await this.contractRepository.findByType(type)

    return success({ contracts })
  }
}
