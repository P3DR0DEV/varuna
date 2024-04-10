import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentRepository } from '../../repositories/department-repository'

type FindBySlugUseCaseResponse = {
  department: Department | null
}
export class FindBySlugUseCasse {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(slug: string): Promise<FindBySlugUseCaseResponse> {
    const department = await this.departmentRepository.findBySlug(slug)

    return { department }
  }
}
