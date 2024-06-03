import { Either, failure, success } from '@/core/types/either'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Contract, ContractTypes } from '@/domain/it-manager/enterprise/entities/contract'
import { ContractRepository } from '../../repositories/contract-repository'

type EditContractUseCaseRequest = {
  id: string
  description: string
  type: ContractTypes
  userEmail: string
  fileName: string
  status: 'active' | 'inactive'
  endsAt: Date | null
}

type EditContractUseCaseResponse = Either<NotFoundError, { contract: Contract }>

export class EditContractUseCase implements UseCase {
  constructor(private contractsRepository: ContractRepository) {}

  async execute(contract: EditContractUseCaseRequest): Promise<EditContractUseCaseResponse> {
    const contractExists = await this.contractsRepository.findById(contract.id)

    if (!contractExists) {
      return failure(NotFound('Contract not found'))
    }

    contractExists.description = contract.description
    contractExists.fileName = contract.fileName
    contractExists.endsAt = contract.endsAt
    contractExists.status = contract.status
    contractExists.type = contract.type
    contractExists.userEmail = contract.userEmail

    await this.contractsRepository.save(contractExists)

    return success({ contract: contractExists })
  }
}
