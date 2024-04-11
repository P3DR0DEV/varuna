import { UseCase } from '@/core/use-cases/use-case'
import { WorkstationRepository } from '../../repositories/workstation-repository'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

type FindByDepartmentIdUseCaseResponse = Either<BadRequestError, { workstations: Workstation[] }>

export class FindByDepartmentIdUseCase implements UseCase {
  constructor(private readonly workstationRepository: WorkstationRepository) {}

  async execute(departmentId: string): Promise<FindByDepartmentIdUseCaseResponse> {
    if (!departmentId) {
      return failure(BadRequest('departmentId is required'))
    }

    const workstations = await this.workstationRepository.findByDepartmentId(departmentId)

    return success({ workstations })
  }
}
