import { DepartmentRepository } from '../../repositories/department-repository'

type DeleteDepartmentUseCaseResponse = {
  departmentId: string
}
export class DeleteDepartmentUseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(departmentId: string): Promise<DeleteDepartmentUseCaseResponse> {
    await this.departmentRepository.delete(departmentId)

    return { departmentId }
  }
}
