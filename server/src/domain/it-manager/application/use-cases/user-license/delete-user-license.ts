import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'

import { UserLicenseRepository } from '../../repositories/user-license-repository'

type DeleteUserLicenseUseCaseProps = {
  id: string
}

type DeleteUserLicenseUseCaseResponse = Either<NotFoundError | BadRequestError, { message: string }>

export class DeleteUserLicenseUseCase implements UseCase {
  constructor(private readonly userLicenseRepository: UserLicenseRepository) {}

  async execute({ id }: DeleteUserLicenseUseCaseProps): Promise<DeleteUserLicenseUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const userLicense = await this.userLicenseRepository.findById(id)

    if (!userLicense) {
      return failure(NotFound('This user-license does not exist or already has been deleted'))
    }

    await this.userLicenseRepository.delete(id)

    return success({ message: 'User-license relationship deleted successfully' })
  }
}
