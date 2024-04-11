import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentRepository } from '../../repositories/department-repository'
import { UseCase } from '@/core/use-cases/use-case'
import { Either, success } from '@/core/types/either'

type FindAllUseCaseResponse = Either<unknown, { departments: Department[] }>

export class FindAllUseCase implements UseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(): Promise<FindAllUseCaseResponse> {
    const departments = await this.departmentRepository.findMany()

    return success({ departments })
  }
}
