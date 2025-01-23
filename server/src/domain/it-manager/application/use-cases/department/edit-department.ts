import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Department } from '@/domain/it-manager/enterprise/entities/department'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import type { DepartmentRepository } from '../../repositories/department-repository'

interface EditDepartmentProps {
  id: string
  name: string
  description: string
  email?: string | null
  slug: string
  chiefId?: string | null
}

type EditDepartmentUseCaseResponse = Either<BadRequestError | NotFoundError, { department: Department }>

export class EditDepartmentUseCase implements UseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute({
    id,
    name,
    description,
    email,
    slug,
    chiefId,
  }: EditDepartmentProps): Promise<EditDepartmentUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Department id is required'))
    }

    const department = await this.departmentRepository.findById(id)

    if (!department) {
      return failure(NotFound('Department not found'))
    }

    let difference = false
    if (department.slug.value !== slug) {
      difference = true
      const departmentWithSameSlug = await this.departmentRepository.findBySlug(slug)

      if (departmentWithSameSlug && departmentWithSameSlug.id.toString() !== id) {
        return failure(BadRequest('A department with this slug already exists'))
      }
    }

    department.name = name
    department.description = description
    department.chiefId = chiefId ? new UniqueEntityID(chiefId) : department.chiefId
    department.slug = difference ? Slug.createFromText(slug) : department.slug
    department.email = email || department.email

    await this.departmentRepository.save(department)

    return success({ department })
  }
}
