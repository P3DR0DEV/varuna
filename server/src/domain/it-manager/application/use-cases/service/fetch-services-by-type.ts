import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Service, ServiceTypes } from '@/domain/it-manager/enterprise/entities/service'

import { ServiceRepository } from '../../repositories/service-repository'

type FetchServicesByTypeUseCaseProps = {
  type: ServiceTypes
}

type FetchServicesByTypeUseCaseResponse = Either<BadRequestError | Error, { services: Service[] }>

export class FetchServicesByTypeUseCase implements UseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute({ type }: FetchServicesByTypeUseCaseProps): Promise<FetchServicesByTypeUseCaseResponse> {
    if (!type || ['database', 'infra', 'application'].findIndex((t) => t === type) === -1) {
      return failure(BadRequest('Invalid type params'))
    }

    const services = await this.serviceRepository.findByType(type)

    return success({ services })
  }
}
