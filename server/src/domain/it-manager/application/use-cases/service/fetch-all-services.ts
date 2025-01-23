import { type Either, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Service, ServiceTypes } from '@/domain/it-manager/enterprise/entities/service'

import type { ServiceRepository } from '../../repositories/service-repository'

type FetchAllServicesUseCaseResponse = Either<Error, { services: Service[] }>

export class FetchAllServicesUseCase implements UseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute({ type }: { type?: ServiceTypes }): Promise<FetchAllServicesUseCaseResponse> {
    const services = await this.serviceRepository.findMany(type)

    return success({ services })
  }
}
