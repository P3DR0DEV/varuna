import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { UseCase } from '@/core/use-cases/use-case'
import { DepartmentRepository } from '../../repositories/department-repository'
import { NotFound, NotFoundError } from '@/core/errors/not-found'

type FetchAllUsersByDepartmentUseCaseProps = {
  departmentId: string
}
type FetchAllUsersByDepartmentUseCaseResponse = Either<BadRequestError | NotFoundError, { users: User[] }>

export class FetchAllUsersByDepartmentUseCase implements UseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async execute({
    departmentId,
  }: FetchAllUsersByDepartmentUseCaseProps): Promise<FetchAllUsersByDepartmentUseCaseResponse> {
    if (!departmentId) {
      return failure(BadRequest('Department id is required'))
    }

    const department = await this.departmentRepository.findById(departmentId)

    if (!department) {
      return failure(NotFound('Department not found'))
    }

    const users = await this.usersRepository.findManyByDepartment(departmentId)

    return success({ users })
  }
}
