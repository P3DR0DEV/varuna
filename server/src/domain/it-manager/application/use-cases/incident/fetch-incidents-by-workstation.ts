import { UseCase } from '@/core/use-cases/use-case'
import { IncidentRepository } from '../../repositories/incident-repository'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Incident } from '@/domain/it-manager/enterprise/entities/incident'
import { WorkstationRepository } from '../../repositories/workstation-repository'
import { NotFound, NotFoundError } from '@/core/errors/not-found'

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
