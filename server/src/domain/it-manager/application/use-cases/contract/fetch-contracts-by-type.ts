import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Contract, ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'

import { ContractRepository } from '../../repositories/contract-repository'

type FetchContractsByTypeUseCaseProps = {
  type: ContractTypes
}
type FetchContractsByTypeUseCaseResponse = Either<BadRequestError, { contracts: Contract[] }>

export class FetchContractsByTypeUseCase implements UseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute({ type }: FetchContractsByTypeUseCaseProps): Promise<FetchContractsByTypeUseCaseResponse> {
    if (['borrowing', 'renting'].indexOf(type) === -1) {
      return failure(BadRequest('Invalid type params'))
    }

    const contracts = await this.contractRepository.findByType(type)

    return success({ contracts })
  }
}
