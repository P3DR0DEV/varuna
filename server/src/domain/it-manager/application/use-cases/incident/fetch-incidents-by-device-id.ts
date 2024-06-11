import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Incident } from '@/domain/it-manager/enterprise/entities/incident'

import { DeviceRepository } from '../../repositories/device-repository'
import { IncidentRepository } from '../../repositories/incident-repository'

type FetchIncidentsByDeviceIdUseCaseProps = {
  deviceId: string
}

type FetchIncidentsByDeviceIdUseCaseResponse = Either<BadRequestError | NotFoundError, { incidents: Incident[] }>

export class FetchIncidentsByDeviceIdUseCase implements UseCase {
  constructor(
    private readonly incidentRepository: IncidentRepository,
    private readonly deviceRepository: DeviceRepository,
  ) {}

  async execute({ deviceId }: FetchIncidentsByDeviceIdUseCaseProps): Promise<FetchIncidentsByDeviceIdUseCaseResponse> {
    if (!deviceId) {
      return failure(BadRequest('Device id is required'))
    }

    const device = await this.deviceRepository.findById(deviceId)

    if (!device) {
      return failure(NotFound('Device not found'))
    }

    const incidents = await this.incidentRepository.findByDeviceId(deviceId)

    return success({ incidents })
  }
}
