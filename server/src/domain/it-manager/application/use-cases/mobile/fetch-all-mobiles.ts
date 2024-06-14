import { Either, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Mobile } from '@/domain/it-manager/enterprise/entities/mobile'

import { MobileRepository } from '../../repositories/mobile-repository'

type FetchAllMobilesUseCaseResponse = Either<unknown, { mobiles: Mobile[] }>

export class FetchAllMobilesUseCase implements UseCase {
  constructor(private readonly mobileRepository: MobileRepository) {}

  async execute(): Promise<FetchAllMobilesUseCaseResponse> {
    const mobiles = await this.mobileRepository.findMany()

    return success({ mobiles })
  }
}
