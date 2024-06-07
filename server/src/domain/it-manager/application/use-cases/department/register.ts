import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentRepository } from '../../repositories/department-repository'
import { UseCase } from '@/core/use-cases/use-case'
import { Either, success } from '@/core/types/either'

interface RegisterDepartmentProps {
  description: string
  email?: string | null
}

type RegisterDepartmentUseCaseResponse = Either<unknown, { department: Department }>

export class RegisterDepartmentUseCase implements UseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(props: RegisterDepartmentProps): Promise<RegisterDepartmentUseCaseResponse> {
    const department = Department.create({
      description: props.description,
      email: props.email,
    })

    await this.departmentRepository.create(department)

    return success({ department })
  }
}
