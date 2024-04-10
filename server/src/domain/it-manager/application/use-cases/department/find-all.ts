import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentRepository } from '../../repositories/department-repository'

type FindAllUseCaseResponse = {
  departments: Department[]
}

export class FindAllUseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(): Promise<FindAllUseCaseResponse> {
    const departments = await this.departmentRepository.findMany()

    return { departments }
  }
}
