import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

import { DepartmentRepository } from '../../repositories/department-repository'
import { LicenseRepository } from '../../repositories/license-repository'
import { UserLicenseRepository } from '../../repositories/user-license-repository'
import { UsersRepository } from '../../repositories/users-repository'

type CreateUserLicenseProps = {
  departmentId: string
  licenseId: string
  userId: string
}

type CreateUserLicenseUseCaseResponse = Either<BadRequestError | NotFoundError, { userLicense: UserLicense }>

export class CreateUserLicenseUseCase implements UseCase {
  constructor(
    private readonly userLicenseRepository: UserLicenseRepository,
    private readonly usersRepository: UsersRepository,
    private readonly licenseRepository: LicenseRepository,
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async execute({
    departmentId,
    licenseId,
    userId,
  }: CreateUserLicenseProps): Promise<CreateUserLicenseUseCaseResponse> {
    if (!departmentId || !licenseId || !userId) {
      return failure(BadRequest('Missing parameters'))
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(NotFound('User not found'))
    }

    const license = await this.licenseRepository.findById(licenseId)

    if (!license) {
      return failure(NotFound('License not found'))
    }

    const department = await this.departmentRepository.findById(departmentId)

    if (!department) {
      return failure(NotFound('Department not found'))
    }

    const userLicense = UserLicense.create({
      departmentId: new UniqueEntityID(departmentId),
      licenseId: new UniqueEntityID(licenseId),
      userId: new UniqueEntityID(userId),
    })

    await this.userLicenseRepository.create(userLicense)

    return success({ userLicense })
  }
}
