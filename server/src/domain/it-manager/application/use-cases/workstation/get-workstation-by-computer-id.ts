import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

import type { WorkstationRepository } from '../../repositories/workstation-repository'

type GetWorkstationByComputerIdUseCaseProps = {
  computerId: string
}
type GetWorkstationByComputerIdUseCase = Either<NotFoundError | BadRequestError, { workstation: Workstation }>

export class GetWorkstationByComputerId {
  constructor(private readonly workstationRepository: WorkstationRepository) {}

  async execute({ computerId }: GetWorkstationByComputerIdUseCaseProps): Promise<GetWorkstationByComputerIdUseCase> {
    if (!computerId) {
      return failure(BadRequest('DeviceId is required'))
    }

    const workstation = await this.workstationRepository.findByComputerId(computerId)

    if (!workstation) {
      return failure(NotFound('Workstation not found'))
    }

    return success({ workstation })
  }
}
