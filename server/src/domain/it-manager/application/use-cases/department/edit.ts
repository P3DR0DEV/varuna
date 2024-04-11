import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentRepository } from '../../repositories/department-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { NotFound } from '@/core/errors/not-found'

interface EditDepartmentProps {
  id: string
  description: string
  email: string | null
  chiefId: string
}

type EditDepartmentUseCaseResponse = Either<Error, { department: Department }>

export class EditDepartmentUseCase implements UseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(props: EditDepartmentProps): Promise<EditDepartmentUseCaseResponse> {
    const department = await this.departmentRepository.findById(props.id)

    if (!department) {
      return failure(NotFound('Department not found'))
    }

    department.description = props.description
    department.chiefId = new UniqueEntityID(props.chiefId)
    department.email = props.email

    await this.departmentRepository.save(department)

    return success({ department })
  }
}
