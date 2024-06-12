import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'

import { ContractRepository } from '../../repositories/contract-repository'

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
