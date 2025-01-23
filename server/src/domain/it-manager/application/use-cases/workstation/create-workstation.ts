import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

import type { ComputerRepository } from '../../repositories/computer-repository'
import type { DepartmentRepository } from '../../repositories/department-repository'
import type { WorkstationRepository } from '../../repositories/workstation-repository'

type CreateWorkstationUseCaseProps = {
  computerId: string
  departmentId: string
}

type CreateWorkstationUseCaseResponse = Either<BadRequestError | NotFoundError, { workstation: Workstation }>

export class CreateWorkstationUseCase implements UseCase {
  constructor(
    private readonly workstationRepository: WorkstationRepository,
    private readonly computerRepository: ComputerRepository,
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async execute({
    computerId,
    departmentId,
  }: CreateWorkstationUseCaseProps): Promise<CreateWorkstationUseCaseResponse> {
    if (!computerId || !departmentId) {
      return failure(BadRequest('ComputerId and DepartmentId are required'))
    }

    const computer = await this.computerRepository.findById(computerId)

    if (!computer) {
      return failure(NotFound('Computer not found'))
    }

    const department = await this.departmentRepository.findById(departmentId)

    if (!department) {
      return failure(NotFound('Department not found'))
    }

    const workstation = Workstation.create({
      computerId: new UniqueEntityID(computerId),
      departmentId: new UniqueEntityID(departmentId),
    })

    await this.workstationRepository.create(workstation)

    return success({ workstation })
  }
}
