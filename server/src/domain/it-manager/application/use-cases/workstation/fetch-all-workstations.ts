import { type Either, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

import type { WorkstationRepository } from '../../repositories/workstation-repository'

type FetchAllWorkstationsUseCaseResponse = Either<unknown, { workstations: Workstation[] }>

export class FetchAllWorkstationsUseCase implements UseCase {
  constructor(private workstationRepository: WorkstationRepository) {}

  async execute(): Promise<FetchAllWorkstationsUseCaseResponse> {
    const workstations = await this.workstationRepository.findMany()

    return success({ workstations })
  }
}
