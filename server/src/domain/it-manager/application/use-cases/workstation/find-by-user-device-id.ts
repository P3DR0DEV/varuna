import { Either, failure, success } from '@/core/types/either'
import { WorkstationRepository } from '../../repositories/workstation-repository'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'
import { UseCase } from '@/core/use-cases/use-case'

type FindByUserDeviceIdUseCaseResponse = Either<BadRequestError | NotFoundError, { workstation: Workstation }>

export class FindByUserDeviceIdUseCase implements UseCase {
  constructor(private readonly workstationRepository: WorkstationRepository) {}

  async execute(userId: string, deviceId: string): Promise<FindByUserDeviceIdUseCaseResponse> {
    if (!userId || !deviceId) {
      return failure(BadRequest('userId and deviceId are required'))
    }
    const workstation = await this.workstationRepository.findByUserIdAndDeviceId(userId, deviceId)

    if (!workstation) {
      return failure(NotFound('Workstation not found'))
    }

    return success({ workstation })
  }
}
