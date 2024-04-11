import { UseCase } from '@/core/use-cases/use-case'
import { WorkstationRepository } from '../../repositories/workstation-repository'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'

type DeleteUseCaseResponse = Promise<Either<BadRequestError, { workstationId: string }>>

export class DeleteUseCase implements UseCase {
  constructor(private readonly workstationRepository: WorkstationRepository) {}

  async execute(id: string): Promise<DeleteUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('workstationId is required'))
    }
    await this.workstationRepository.delete(id)

    return success({ workstationId: id })
  }
}
