import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'

import { DepartmentRepository } from '../../repositories/department-repository'

type DeleteDepartmentUseCaseProps = {
  id: string
}
type DeleteDepartmentUseCaseResponse = Either<BadRequestError | NotFoundError, { message: string }>

export class DeleteDepartmentUseCase implements UseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute({ id }: DeleteDepartmentUseCaseProps): Promise<DeleteDepartmentUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Department id is required'))
    }

    const department = await this.departmentRepository.findById(id)

    if (!department) {
      return failure(NotFound('This department does not exist or already has been deleted'))
    }

    await this.departmentRepository.delete(id)

    return success({ message: 'Department deleted successfully' })
  }
}
