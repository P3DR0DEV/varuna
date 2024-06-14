import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'

import { MobileRepository } from '../../repositories/mobile-repository'

type DeleteMobileUseCaseProps = {
  id: string
}

type DeleteMobileUseCaseResponse = Either<NotFoundError | BadRequestError, { message: string }>

export class DeleteMobileUseCase implements UseCase {
  constructor(private readonly mobileRepository: MobileRepository) {}

  async execute({ id }: DeleteMobileUseCaseProps): Promise<DeleteMobileUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('ID is required'))
    }

    const mobile = await this.mobileRepository.findById(id)

    if (!mobile) {
      return failure(NotFound('This mobile does not exist or already has been deleted'))
    }

    await this.mobileRepository.delete(id)

    return success({ message: 'Mobile deleted successfully' })
  }
}
