import { UseCase } from '@/core/use-cases/use-case'
import { ContractRepository } from '../../repositories/contract-repository'
import { Either, failure, success } from '@/core/types/either'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'

type FindByIdResponse = Either<BadRequestError | NotFoundError, { contract: Contract }>

export class FindByIdUseCase implements UseCase {
  constructor(private contractRepository: ContractRepository) {}

  async execute(id: string): Promise<FindByIdResponse> {
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
