import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

import { ComputerRepository } from '../../repositories/computer-repository'
import { DepartmentRepository } from '../../repositories/department-repository'
import { WorkstationRepository } from '../../repositories/workstation-repository'

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
