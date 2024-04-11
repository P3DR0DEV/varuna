import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentRepository } from '../../repositories/department-repository'

type FindBySlugUseCaseResponse = {
  department: Department | null
}
export class FindBySlugUseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(slug: string): Promise<FindBySlugUseCaseResponse> {
    const department = await this.departmentRepository.findBySlug(slug)

    if (!department) {
      throw new Error('Department not found')
    }

    return { department }
  }
}
