import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentRepository } from '../../repositories/department-repository'

type FindByIdUseCaseResponse = {
  department: Department | null
}
export class FindByIdUseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(id: string): Promise<FindByIdUseCaseResponse> {
    const department = await this.departmentRepository.findById(id)

    if (!department) {
      throw new Error('Department not found')
    }

    return { department }
  }
}
