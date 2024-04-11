import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentRepository } from '../../repositories/department-repository'
import { Either, failure, success } from '@/core/types/either'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'

type FindByIdUseCaseResponse = Either<NotFoundError, { department: Department }>

export class FindByIdUseCase implements UseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(id: string): Promise<FindByIdUseCaseResponse> {
    const department = await this.departmentRepository.findById(id)

    if (!department) {
      return failure(NotFound('Department not found'))
    }

    return success({ department })
  }
}
