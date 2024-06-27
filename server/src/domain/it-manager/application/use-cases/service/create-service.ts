import { NotFound } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Service, ServiceTypes } from '@/domain/it-manager/enterprise/entities/service'

import { ComputerRepository } from '../../repositories/computer-repository'
import { ServiceRepository } from '../../repositories/service-repository'

type CreateServiceUseCaseProps = {
  description: string
  ipAddress: string
  name: string
  port: number
  type: ServiceTypes
}

type CreateServiceUseCaseResponse = Either<Error, { service: Service }>

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
