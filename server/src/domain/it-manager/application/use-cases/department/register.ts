import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentRepository } from '../../repositories/department-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface RegisterDepartmentProps {
  chiefId: string
  description: string
  email?: string | null
}

interface RegisterDepartmentUseCaseResponse {
  department: Department
}

export class RegisterDepartmentUseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(props: RegisterDepartmentProps): Promise<RegisterDepartmentUseCaseResponse> {
    const department = Department.create({
      chiefId: new UniqueEntityID(props.chiefId),
      description: props.description,
      email: props.email,
    })
    await this.departmentRepository.create(department)

    return {
      department,
    }
  }
}
