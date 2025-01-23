import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Department } from '@/domain/it-manager/enterprise/entities/department'

import type { DepartmentRepository } from '../../repositories/department-repository'

type GetDepartmentBySlugUseCaseProps = {
  slug: string
}
type GetDepartmentBySlugUseCaseResponse = Either<BadRequestError | NotFoundError, { department: Department }>

export class GetDepartmentBySlugUseCase implements UseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute({ slug }: GetDepartmentBySlugUseCaseProps): Promise<GetDepartmentBySlugUseCaseResponse> {
    if (!slug) {
      return failure(BadRequest('Department slug is required'))
    }

    const department = await this.departmentRepository.findBySlug(slug)

    if (!department) {
      return failure(NotFound('Department not found'))
    }

    return success({ department })
  }
}
