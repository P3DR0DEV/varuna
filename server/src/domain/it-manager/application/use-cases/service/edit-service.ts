import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Service, ServiceTypes } from '@/domain/it-manager/enterprise/entities/service'

import type { ComputerRepository } from '../../repositories/computer-repository'
import type { ServiceRepository } from '../../repositories/service-repository'

type EditServiceUseCaseProps = {
  id: string
  description: string
  ipAddress: string
  name: string
  port: number
  type: ServiceTypes
}

type EditServiceUseCaseResponse = Either<NotFoundError | BadRequestError, { service: Service }>

export class EditServiceUseCase implements UseCase {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly computerRepository: ComputerRepository,
  ) {}

  async execute({
    id,
    description,
    ipAddress,
    name,
    port,
    type,
  }: EditServiceUseCaseProps): Promise<EditServiceUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Missing id'))
    }
    const computer = await this.computerRepository.findByIpAddress(ipAddress)

    if (!computer) {
      return failure(NotFound('No computer found with this ip address'))
    }

    const service = await this.serviceRepository.findById(id)

    if (!service) {
      return failure(NotFound('Service not found'))
    }

    service.description = description
    service.ipAddress = ipAddress
    service.name = name
    service.port = port
    service.type = type

    await this.serviceRepository.save(service)

    return success({ service })
  }
}
