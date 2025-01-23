import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'

import type { WorkstationRepository } from '../../repositories/workstation-repository'

type DeleteWorkstationUseCaseProps = {
  id: string
}
type DeleteWorkstationUseCaseResponse = Promise<Either<BadRequestError | NotFoundError, { message: string }>>

export class DeleteWorkstationUseCase implements UseCase {
  constructor(private readonly workstationRepository: WorkstationRepository) {}

  async execute({ id }: DeleteWorkstationUseCaseProps): Promise<DeleteWorkstationUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('workstationId is required'))
    }

    const workstation = await this.workstationRepository.findById(id)

    if (!workstation) {
      return failure(NotFound('This workstation has already been deleted or does not exist'))
    }

    await this.workstationRepository.delete(id)

    return success({ message: 'Workstation deleted successfully' })
  }
}
