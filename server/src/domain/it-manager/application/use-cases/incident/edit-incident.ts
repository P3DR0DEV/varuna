import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Incident } from '@/domain/it-manager/enterprise/entities/incident'

import type { IncidentRepository } from '../../repositories/incident-repository'

type EditIncidentUseCaseProps = {
  id: string
  description: string
  workstationId: string
  deviceId: string | null
  fixedAt: Date | null
}

type EditIncidentUseCaseResponse = Either<BadRequestError | NotFoundError, { incident: Incident }>

export class EditIncidentUseCase implements UseCase {
  constructor(private readonly incidentRepository: IncidentRepository) {}

  async execute({
    id,
    description,
    workstationId,
    deviceId,
    fixedAt,
  }: EditIncidentUseCaseProps): Promise<EditIncidentUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const incident = await this.incidentRepository.findById(id)

    if (!incident) {
      return failure(NotFound('Incident not found'))
    }

    incident.description = description
    incident.workstationId = new UniqueEntityID(workstationId)
    incident.deviceId = deviceId ? new UniqueEntityID(deviceId) : null
    incident.fixedAt = fixedAt

    await this.incidentRepository.save(incident)

    return success({ incident })
  }
}
