import { UseCase } from '@/core/use-cases/use-case'
import { IncidentRepository } from '../../repositories/incident-repository'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Incident } from '@/domain/it-manager/enterprise/entities/incident'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

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
