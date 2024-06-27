import { Either, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Service } from '@/domain/it-manager/enterprise/entities/service'

import { ServiceRepository } from '../../repositories/service-repository'

type FetchAllServicesUseCaseResponse = Either<Error, { services: Service[] }>

export class FetchAllServicesUseCase implements UseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(): Promise<FetchAllServicesUseCaseResponse> {
    const services = await this.serviceRepository.findMany()

    return success({ services })
  }
}
