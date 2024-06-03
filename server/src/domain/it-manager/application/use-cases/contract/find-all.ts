import { UseCase } from '@/core/use-cases/use-case'
import { ContractRepository } from '../../repositories/contract-repository'
import { Either, success } from '@/core/types/either'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'

type FindAllUseCaseResponse = Either<unknown, { contracts: Contract[] }>

export class FindAllUseCase implements UseCase {
  constructor(private contractRepository: ContractRepository) {}

  async execute(): Promise<FindAllUseCaseResponse> {
    const contracts = await this.contractRepository.findMany()

    return success({ contracts })
  }
}
