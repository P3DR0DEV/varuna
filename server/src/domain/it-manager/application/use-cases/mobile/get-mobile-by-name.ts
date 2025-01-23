import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Mobile } from '@/domain/it-manager/enterprise/entities/mobile'

import type { MobileRepository } from '../../repositories/mobile-repository'

type GetMobileByNameUseCaseProps = {
  name: string
}

type GetMobileByNameUseCaseResponse = Either<BadRequestError | NotFoundError, { mobile: Mobile }>

export class GetMobileByNameUseCase implements UseCase {
  constructor(private readonly mobileRepository: MobileRepository) {}

  async execute({ name }: GetMobileByNameUseCaseProps): Promise<GetMobileByNameUseCaseResponse> {
    if (!name) {
      return failure(BadRequest('Name is required'))
    }

    const mobile = await this.mobileRepository.findByName(name)

    if (!mobile) {
      return failure(NotFound('Mobile not found'))
    }

    return success({ mobile })
  }
}
