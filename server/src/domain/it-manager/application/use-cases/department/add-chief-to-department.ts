import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentRepository } from '../../repositories/department-repository'
import { UsersRepository } from '../../repositories/users-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type AddChiefToDepartmentUseCaseProps = {
  departmentId: string
  chiefId: string
}

type AddChiefToDepartmentUseCaseResponse = Either<NotFoundError | BadRequestError, { department: Department }>

export class AddChiefToDepartmentUseCase implements UseCase {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    chiefId,
    departmentId,
  }: AddChiefToDepartmentUseCaseProps): Promise<AddChiefToDepartmentUseCaseResponse> {
    if (!chiefId || !departmentId) {
      return failure(BadRequest('Department id and chief id are required'))
    }

    const department = await this.departmentRepository.findById(departmentId)

    if (!department) {
      return failure(NotFound('Department not found'))
    }

    const chief = await this.usersRepository.findById(chiefId)

    if (!chief) {
      return failure(NotFound('User not found'))
    }

    department.chiefId = new UniqueEntityID(chiefId)
    await this.departmentRepository.save(department)

    return success({ department })
  }
}
