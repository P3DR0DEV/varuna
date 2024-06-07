import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentRepository } from '../../repositories/department-repository'
import { Either, failure, success } from '@/core/types/either'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'

type FindByIdUseCaseResponse = Either<NotFoundError | BadRequestError, { department: Department }>

export class FindByIdUseCase implements UseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(id: string): Promise<FindByIdUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Department id is required'))
    }

    const department = await this.departmentRepository.findById(id)

    if (!department) {
      return failure(NotFound('Department not found'))
    }

    return success({ department })
  }
}
