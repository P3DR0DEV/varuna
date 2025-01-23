import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Service } from '@/domain/it-manager/enterprise/entities/service'

import type { ComputerRepository } from '../../repositories/computer-repository'
import type { ServiceRepository } from '../../repositories/service-repository'

type FetchServicesByIpAddressUseCaseProps = {
  ipAddress: string
}

type FetchServicesByIpAddressUseCaseResponse = Either<NotFoundError | BadRequestError, { services: Service[] }>

export class FetchServicesByIpAddressUseCase implements UseCase {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly computerRepository: ComputerRepository,
  ) {}

  async execute({ ipAddress }: FetchServicesByIpAddressUseCaseProps): Promise<FetchServicesByIpAddressUseCaseResponse> {
    if (!ipAddress) {
      return failure(BadRequest('ipAddress is required'))
    }

    const computer = await this.computerRepository.findByIpAddress(ipAddress)

    if (!computer) {
      return failure(NotFound('No computer found with this ip address'))
    }

    const services = await this.serviceRepository.findByIpAddress(ipAddress)

    return success({ services })
  }
}
