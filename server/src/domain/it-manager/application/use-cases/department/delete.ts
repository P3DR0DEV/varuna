import { UseCase } from '@/core/use-cases/use-case'
import { DepartmentRepository } from '../../repositories/department-repository'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'

type DeleteDepartmentUseCaseResponse = Either<BadRequestError | NotFoundError, { message: string }>

export class DeleteDepartmentUseCase implements UseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(departmentId: string): Promise<DeleteDepartmentUseCaseResponse> {
    if (!departmentId) {
      return failure(BadRequest('Department id is required'))
    }

    const department = await this.departmentRepository.findById(departmentId)

    if (!department) {
      return failure(NotFound('This department does not exist or already has been deleted'))
    }

    await this.departmentRepository.delete(departmentId)

    return success({ message: 'Department deleted successfully' })
  }
}
