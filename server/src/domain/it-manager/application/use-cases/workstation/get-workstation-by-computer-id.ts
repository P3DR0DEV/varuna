import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { WorkstationRepository } from '../../repositories/workstation-repository'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

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
