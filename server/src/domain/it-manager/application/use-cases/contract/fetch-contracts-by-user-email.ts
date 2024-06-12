import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'

import { ContractRepository } from '../../repositories/contract-repository'

type FetchContractsByEmailUseCaseProps = {
  userEmail: string
}

type FetchContractsByEmailUseCaseResponse = Either<BadRequestError, { contracts: Contract[] }>

export class FetchContractsByEmailUseCase implements UseCase {
  constructor(private contractRepository: ContractRepository) {}

  async execute({ userEmail }: FetchContractsByEmailUseCaseProps): Promise<FetchContractsByEmailUseCaseResponse> {
    if (!userEmail) {
      return failure(BadRequest('Invalid user email'))
    }
    const contracts = await this.contractRepository.findByUserEmail(userEmail)

    return success({ contracts })
  }
}
