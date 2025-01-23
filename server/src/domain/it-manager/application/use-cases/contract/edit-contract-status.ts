import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { Contract, ContractStatus } from '@/domain/it-manager/enterprise/entities/contract'

import type { ContractRepository } from '../../repositories/contract-repository'

type EditContractStatusUseCaseProps = {
  id: string
  status: ContractStatus
}

type EditContractStatusUseCaseResponse = Either<BadRequestError | NotFoundError, { contract: Contract }>

export class EditContractStatusUseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute({ id, status }: EditContractStatusUseCaseProps): Promise<EditContractStatusUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const contract = await this.contractRepository.editContractStatus({ id, status })

    if (!contract) {
      return failure(NotFound('Contract not found'))
    }

    return success({ contract })
  }
}
