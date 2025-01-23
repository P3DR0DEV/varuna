import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Contract } from '@/domain/it-manager/enterprise/entities/contract'

import type { ContractRepository } from '../../repositories/contract-repository'

type GetContractByIdUseCaseProps = {
  id: string
}
type GetContractByIdUseCaseResponse = Either<BadRequestError | NotFoundError, { contract: Contract }>

export class GetContractByIdUseCase implements UseCase {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute({ id }: GetContractByIdUseCaseProps): Promise<GetContractByIdUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const contract = await this.contractRepository.findById(id)

    if (!contract) {
      return failure(NotFound('Contract not found'))
    }
    return success({ contract })
  }
}
