import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Incident } from '@/domain/it-manager/enterprise/entities/incident'

import { IncidentRepository } from '../../repositories/incident-repository'

type GetIncidentByIdUseCaseProps = {
  id: string
}

type GetIncidentByIdUseCaseResponse = Either<NotFoundError | BadRequestError, { incident: Incident }>

export class GetIncidentByIdUseCase implements UseCase {
  constructor(private readonly incidentRepository: IncidentRepository) {}

  async execute({ id }: GetIncidentByIdUseCaseProps): Promise<GetIncidentByIdUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const incident = await this.incidentRepository.findById(id)

    if (!incident) {
      return failure(NotFound('Incident not found'))
    }

    return success({ incident })
  }
}
