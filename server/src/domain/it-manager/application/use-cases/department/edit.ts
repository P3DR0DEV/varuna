import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentRepository } from '../../repositories/department-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface EditDepartmentProps {
  id: string
  description: string
  email: string | null
  chiefId: string
}

type EditDepartmentUseCaseResponse = {
  department: Department
}

export class EditDepartmentUseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(props: EditDepartmentProps): Promise<EditDepartmentUseCaseResponse> {
    const department = await this.departmentRepository.findById(props.id)

    if (!department) {
      throw new Error('Department not found')
    }

    department.description = props.description
    department.chiefId = new UniqueEntityID(props.chiefId)
    department.email = props.email

    await this.departmentRepository.save(department)

    return {
      department,
    }
  }
}
