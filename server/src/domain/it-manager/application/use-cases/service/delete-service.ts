import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'

import { ServiceRepository } from '../../repositories/service-repository'

type DeleteServiceUseCaseProps = {
  id: string
}

type DeleteServiceUseCaseResponse = Either<NotFoundError | BadRequestError, { message: string }>

export class DeleteServiceUseCase implements UseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute({ id }: DeleteServiceUseCaseProps): Promise<DeleteServiceUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const service = await this.serviceRepository.findById(id)

    if (!service) {
      return failure(NotFound('This service does not exist or already has been deleted'))
    }

    await this.serviceRepository.delete(id)

    return success({ message: 'Service deleted successfully' })
  }
}
