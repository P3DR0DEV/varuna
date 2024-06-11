import { Either, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

import { WorkstationRepository } from '../../repositories/workstation-repository'

type FetchAllWorkstationsUseCaseResponse = Either<unknown, { workstations: Workstation[] }>

export class FetchAllWorkstationsUseCase implements UseCase {
  constructor(private workstationRepository: WorkstationRepository) {}

  async execute(): Promise<FetchAllWorkstationsUseCaseResponse> {
    const workstations = await this.workstationRepository.findMany()

    return success({ workstations })
  }
}
