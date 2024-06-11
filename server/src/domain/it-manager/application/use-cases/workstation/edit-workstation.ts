import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

import { ComputerRepository } from '../../repositories/computer-repository'
import { DepartmentRepository } from '../../repositories/department-repository'
import { WorkstationRepository } from '../../repositories/workstation-repository'

type EditWorkstationUseCaseProps = {
  id: string
  computerId: string
  departmentId: string
}

type EditWorkstationUseCaseResponse = Either<NotFoundError | BadRequestError, { workstation: Workstation }>

export class EditWorkstationUseCase implements UseCase {
  constructor(
    private readonly workstationRepository: WorkstationRepository,
    private readonly computerRepository: ComputerRepository,
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async execute({
    id,
    computerId,
    departmentId,
  }: EditWorkstationUseCaseProps): Promise<EditWorkstationUseCaseResponse> {
    if (!id || !computerId || !departmentId) {
      return failure(BadRequest('Workstation properties are required'))
    }

    const workstation = await this.workstationRepository.findById(id)

    if (!workstation) {
      return failure(NotFound('Workstation not found'))
    }

    const computer = await this.computerRepository.findById(computerId)

    if (!computer) {
      return failure(NotFound('Computer not found'))
    }

    const department = await this.departmentRepository.findById(departmentId)

    if (!department) {
      return failure(NotFound('Department not found'))
    }

    workstation.computerId = new UniqueEntityID(computerId)
    workstation.departmentId = new UniqueEntityID(departmentId)

    await this.workstationRepository.save(workstation)

    return success({ workstation })
  }
}
