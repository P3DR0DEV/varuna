import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Service } from '@/domain/it-manager/enterprise/entities/service'

import { ServiceRepository } from '../../repositories/service-repository'

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
