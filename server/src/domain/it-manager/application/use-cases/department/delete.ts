import { UseCase } from '@/core/use-cases/use-case'
import { DepartmentRepository } from '../../repositories/department-repository'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'

type DeleteDepartmentUseCaseResponse = Either<BadRequestError, { departmentId: string }>

export class DeleteDepartmentUseCase implements UseCase {
  constructor(private departmentRepository: DepartmentRepository) {}

  async execute(departmentId: string): Promise<DeleteDepartmentUseCaseResponse> {
    if (!departmentId) {
      return failure(BadRequest('Department id is required'))
    }
    await this.departmentRepository.delete(departmentId)

    return success({ departmentId })
  }
}
