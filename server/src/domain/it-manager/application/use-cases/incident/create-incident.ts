import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Incident } from '@/domain/it-manager/enterprise/entities/incident'
import { IncidentRepository } from '../../repositories/incident-repository'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { DeviceRepository } from '../../repositories/device-repository'

type CreateIncidentUseCaseProps = {
  description: string
  workstationId: string
  deviceId?: string | null
}

type CreateIncidentUseCaseResponse = Either<NotFoundError | BadRequestError, { incident: Incident }>
export class CreateIncidentUseCase implements UseCase {
  constructor(
    private readonly incidentRepository: IncidentRepository,
    private readonly deviceRepository: DeviceRepository,
    private readonly workstationRepository: DeviceRepository,
  ) {}

  async execute({
    description,
    workstationId,
    deviceId,
  }: CreateIncidentUseCaseProps): Promise<CreateIncidentUseCaseResponse> {
    if (!description || !workstationId) {
      return failure(BadRequest('Missing parameters'))
    }

    const workstation = await this.workstationRepository.findById(workstationId)

    if (!workstation) {
      return failure(NotFound('Workstation not found'))
    }

    if (deviceId) {
      const device = await this.deviceRepository.findById(deviceId)

      if (!device) {
        return failure(NotFound('Device not found'))
      }
    }

    const incident = Incident.create({
      description,
      workstationId,
      deviceId,
    })

    await this.incidentRepository.create(incident)

    return success({ incident })
  }
}
