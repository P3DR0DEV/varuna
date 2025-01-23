import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Service } from '@/domain/it-manager/enterprise/entities/service'

import type { ServiceRepository } from '../../repositories/service-repository'

type GetServiceByIdUseCaseProps = {
  id: string
}

type GetServiceByIdUseCaseResponse = Either<NotFoundError | BadRequestError, { service: Service }>

export class GetServiceByIdUseCase implements UseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute({ id }: GetServiceByIdUseCaseProps): Promise<GetServiceByIdUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const service = await this.serviceRepository.findById(id)

    if (!service) {
      return failure(NotFound('Service not found'))
    }

    return success({ service })
  }
}
