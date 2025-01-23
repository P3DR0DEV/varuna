import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Department } from '@/domain/it-manager/enterprise/entities/department'

import type { DepartmentRepository } from '../../repositories/department-repository'

type GetDepartmentByIdUseCaseProps = {
  id: string
}

type GetDepartmentByIdUseCaseResponse = Either<NotFoundError | BadRequestError, { department: Department }>

export class GetDepartmentByIdUseCase implements UseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute({ id }: GetDepartmentByIdUseCaseProps): Promise<GetDepartmentByIdUseCaseResponse> {
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
