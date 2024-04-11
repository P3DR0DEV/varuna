import { UseCase } from '@/core/use-cases/use-case'
import { WorkstationRepository } from '../../repositories/workstation-repository'
import { Either, failure, success } from '@/core/types/either'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'

type FindByUserIdUseCaseResponse = Either<BadRequestError, { workstations: Workstation[] }>

export class FindByUserIdUseCase implements UseCase {
  constructor(private workstationRepository: WorkstationRepository) {}

  async execute(userId: string): Promise<FindByUserIdUseCaseResponse> {
    if (!userId) {
      return failure(BadRequest('userId is required'))
    }

    const workstations = await this.workstationRepository.findByUserId(userId)

    return success({ workstations })
  }
}
