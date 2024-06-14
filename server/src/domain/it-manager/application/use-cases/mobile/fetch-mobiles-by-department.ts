import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Mobile } from '@/domain/it-manager/enterprise/entities/mobile'

import { DepartmentRepository } from '../../repositories/department-repository'
import { MobileRepository } from '../../repositories/mobile-repository'

type FetchMobilesByDepartmentUseCaseProps = {
  departmentId: string
}
type FetchMobilesByDepartmentUseCaseResponse = Either<BadRequestError | NotFoundError, { mobiles: Mobile[] }>

export class FetchMobilesByDepartmentUseCase implements UseCase {
  constructor(
    private readonly mobileRepository: MobileRepository,
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async execute({
    departmentId,
  }: FetchMobilesByDepartmentUseCaseProps): Promise<FetchMobilesByDepartmentUseCaseResponse> {
    if (!departmentId) {
      return failure(BadRequest('Department ID is required'))
    }

    const department = await this.departmentRepository.findById(departmentId)

    if (!department) {
      return failure(NotFound('Department not found'))
    }

    const mobiles = await this.mobileRepository.findByDepartmentId(departmentId)

    return success({ mobiles })
  }
}
