import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Contract, ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'

import { ContractRepository } from '../../repositories/contract-repository'

type EditContractUseCaseProps = {
  id: string
  description: string
  type: ContractTypes
  userEmail: string
  fileName: string
  status: 'active' | 'inactive'
  endsAt: Date | null
}

type EditContractUseCaseResponse = Either<BadRequestError | NotFoundError, { contract: Contract }>

export class EditContractUseCase implements UseCase {
  constructor(private readonly contractsRepository: ContractRepository) {}

  async execute({
    description,
    type,
    userEmail,
    fileName,
    status,
    endsAt,
    id,
  }: EditContractUseCaseProps): Promise<EditContractUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Contract not found'))
    }

    const contract = await this.contractsRepository.findById(id)

    if (!contract) {
      return failure(NotFound('Contract not found'))
    }

    contract.description = description
    contract.fileName = fileName
    contract.endsAt = endsAt
    contract.status = status
    contract.type = type
    contract.userEmail = userEmail

    await this.contractsRepository.save(contract)

    return success({ contract })
  }
}
