import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentRepository } from '../../repositories/department-repository'
import { UseCase } from '@/core/use-cases/use-case'
import { Either, failure, success } from '@/core/types/either'
import { NotFound, NotFoundError } from '@/core/errors/not-found'

type FindBySlugUseCaseResponse = Either<NotFoundError, { department: Department }>

export class FindBySlugUseCase implements UseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(slug: string): Promise<FindBySlugUseCaseResponse> {
    const department = await this.departmentRepository.findBySlug(slug)

    if (!department) {
      return failure(NotFound('Department not found'))
    }

    return success({ department })
  }
}
