import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import type { DepartmentRepository } from '../../repositories/department-repository'

interface CreateDepartmentUseCaseProps {
  name: string
  description: string
  email?: string | null
}

type CreateDepartmentUseCaseResponse = Either<BadRequestError, { department: Department }>

export class CreateDepartmentUseCase implements UseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute({ name, description, email }: CreateDepartmentUseCaseProps): Promise<CreateDepartmentUseCaseResponse> {
    const slug = Slug.createFromText(description)

    const departmentWithSameSlug = await this.departmentRepository.findBySlug(slug.value)

    if (departmentWithSameSlug) {
      return failure(BadRequest('A department with this slug already exists'))
    }

    const department = Department.create({
      name,
      description,
      email,
    })

    await this.departmentRepository.create(department)

    return success({ department })
  }
}
