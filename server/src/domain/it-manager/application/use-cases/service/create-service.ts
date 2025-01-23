import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import { Service, type ServiceTypes } from '@/domain/it-manager/enterprise/entities/service'

import type { ComputerRepository } from '../../repositories/computer-repository'
import type { ServiceRepository } from '../../repositories/service-repository'

type CreateServiceUseCaseProps = {
  description: string
  ipAddress: string
  name: string
  port: number
  type: ServiceTypes
}

type CreateServiceUseCaseResponse = Either<NotFoundError, { service: Service }>

export class CreateServiceUseCase implements UseCase {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly computerRepository: ComputerRepository,
  ) {}

  async execute({
    description,
    ipAddress,
    name,
    port,
    type,
  }: CreateServiceUseCaseProps): Promise<CreateServiceUseCaseResponse> {
    const computer = await this.computerRepository.findByIpAddress(ipAddress)

    if (!computer) {
      return failure(NotFound('No computer found with this ip address'))
    }

    const service = Service.create({
      description,
      ipAddress,
      name,
      port,
      type,
    })

    await this.serviceRepository.create(service)

    return success({ service })
  }
}
