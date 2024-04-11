import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { UseCase } from '@/core/use-cases/use-case'

type FindAllByDepartmentUseCaseResponse = Either<BadRequestError, { users: User[] }>

export class FindAllByDepartmentUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(departmentId: string): Promise<FindAllByDepartmentUseCaseResponse> {
    if (!departmentId) {
      return failure(BadRequest('Department id is required'))
    }

    const users = await this.usersRepository.findManyByDepartment(departmentId)

    return success({ users })
  }
}
