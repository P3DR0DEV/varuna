import { Either, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Department } from '@/domain/it-manager/enterprise/entities/department'

import { DepartmentRepository } from '../../repositories/department-repository'

type FetchAllDepartmentsUseCaseResponse = Either<unknown, { departments: Department[] }>

export class FetchAllDepartmentsUseCase implements UseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(): Promise<FetchAllDepartmentsUseCaseResponse> {
    const departments = await this.departmentRepository.findMany()

    return success({ departments })
  }
}
