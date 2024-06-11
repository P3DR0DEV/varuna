import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'

import { IncidentRepository } from '../../repositories/incident-repository'

type UpdateIncidentStatusToFixedUseCaseProps = {
  id: string
}

type UpdateIncidentStatusToFixedUseCaseResponse = Either<BadRequestError | NotFoundError, { message: string }>

export class UpdateIncidentStatusToFixedUseCase implements UseCase {
  constructor(private readonly incidentRepository: IncidentRepository) {}

  async execute({ id }: UpdateIncidentStatusToFixedUseCaseProps): Promise<UpdateIncidentStatusToFixedUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const incident = await this.incidentRepository.findById(id)

    if (!incident) {
      return failure(NotFound('Incident not found'))
    }

    await this.incidentRepository.setIncidentAsFixed(id)

    return success({ message: 'Incident status updated successfully' })
  }
}
