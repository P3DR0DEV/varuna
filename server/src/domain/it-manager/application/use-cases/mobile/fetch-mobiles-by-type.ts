import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Mobile, MobileTypes } from '@/domain/it-manager/enterprise/entities/mobile'

import { MobileRepository } from '../../repositories/mobile-repository'

type FetchMobilesByTypeUseCaseProps = {
  type: MobileTypes
}
type FetchMobilesByTypeUseCaseResponse = Either<BadRequestError, { mobiles: Mobile[] }>

export class FetchMobilesByTypeUseCase implements UseCase {
  constructor(private readonly mobileRepository: MobileRepository) {}

  async execute({ type }: FetchMobilesByTypeUseCaseProps): Promise<FetchMobilesByTypeUseCaseResponse> {
    if (!type) {
      return failure(BadRequest('Type is required'))
    }

    if (['cellphone', 'tablet'].indexOf(type) === -1) {
      return failure(BadRequest('Invalid type params'))
    }

    const mobiles = await this.mobileRepository.findByType(type)

    return success({ mobiles })
  }
}
