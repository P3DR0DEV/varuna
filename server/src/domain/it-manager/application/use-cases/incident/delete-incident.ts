import { UseCase } from '@/core/use-cases/use-case'
import { IncidentRepository } from '../../repositories/incident-repository'
import { Either, failure, success } from '@/core/types/either'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'

type DeleteIncidentUseCaseProps = {
  id: string
}

type DeleteIncidentUseCaseResponse = Either<NotFoundError | BadRequestError, { message: string }>

export class DeleteIncidentUseCase implements UseCase {
  constructor(private readonly incidentRepository: IncidentRepository) {}

  async execute({ id }: DeleteIncidentUseCaseProps): Promise<DeleteIncidentUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }
    const incident = await this.incidentRepository.findById(id)
    if (!incident) {
      return failure(NotFound('This incident has already been deleted or does not exist'))
    }

    await this.incidentRepository.delete(id)

    return success({ message: 'Incident deleted successfully' })
  }
}
