import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { WorkstationRepository } from '../../repositories/workstation-repository'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

type FindByDeviceIdUseCaseResponse = Either<NotFoundError | BadRequestError, { workstation: Workstation }>

export class FindByDeviceId {
  constructor(private readonly workstationRepository: WorkstationRepository) {}

  async execute(deviceId: string): Promise<FindByDeviceIdUseCaseResponse> {
    if (!deviceId) {
      return failure(BadRequest('DeviceId is required'))
    }

    const workstation = await this.workstationRepository.findByDeviceId(deviceId)

    if (!workstation) {
      return failure(NotFound('Workstation not found'))
    }

    return success({ workstation })
  }
}
