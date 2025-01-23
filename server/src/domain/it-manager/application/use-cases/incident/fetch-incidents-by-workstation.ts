import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Incident } from '@/domain/it-manager/enterprise/entities/incident'

import type { IncidentRepository } from '../../repositories/incident-repository'
import type { WorkstationRepository } from '../../repositories/workstation-repository'

type FetchIncidentsByWorkstationUseCaseProps = {
  workstationId: string
}

type FetchIncidentsByWorkstationUseCaseResponse = Either<BadRequestError | NotFoundError, { incidents: Incident[] }>

export class FetchIncidentsByWorkstationUseCase implements UseCase {
  constructor(
    private readonly incidentRepository: IncidentRepository,
    private readonly workstationRepository: WorkstationRepository,
  ) {}

  async execute({
    workstationId,
  }: FetchIncidentsByWorkstationUseCaseProps): Promise<FetchIncidentsByWorkstationUseCaseResponse> {
    if (!workstationId) {
      return failure(BadRequest('Workstation id is required'))
    }

    const workstation = await this.workstationRepository.findById(workstationId)

    if (!workstation) {
      return failure(NotFound('Workstation not found'))
    }
    const incidents = await this.incidentRepository.findByWorkstationId(workstationId)

    return success({ incidents })
  }
}
