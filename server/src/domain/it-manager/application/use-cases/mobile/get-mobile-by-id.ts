import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Mobile } from '@/domain/it-manager/enterprise/entities/mobile'

import { MobileRepository } from '../../repositories/mobile-repository'

type GetMobileByIdUseCaseProps = {
  id: string
}
type GetMobileByIdUseCaseResponse = Either<BadRequestError | NotFoundError, { mobile: Mobile }>

export class GetMobileByIdUseCase implements UseCase {
  constructor(private readonly mobileRepository: MobileRepository) {}

  async execute({ id }: GetMobileByIdUseCaseProps): Promise<GetMobileByIdUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('ID is required'))
    }

    const mobile = await this.mobileRepository.findById(id)

    if (!mobile) {
      return failure(NotFound('Mobile not found'))
    }

    return success({ mobile })
  }
}
