import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { User } from '@/domain/it-manager/enterprise/entities/user'

import type { DepartmentRepository } from '../../repositories/department-repository'
import type { UsersRepository } from '../../repositories/users-repository'

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
