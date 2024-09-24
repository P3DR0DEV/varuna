import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import { ComputerRepository } from '../../repositories/computer-repository'

type CreateComputerUseCaseProps = {
  hostname: string
  operatingSystem: string
  type: 'notebook' | 'desktop' | 'server'
  ipAddress: string
  tag?: string | null
  description: string
  serialNumber: string
  model: string
  acquisitionDate: Date
  endWarrantyDate?: Date | null
  invoiceNumber?: string | null
  contractId?: string | null
}

type CreateComputerUseCaseResponse = Either<BadRequestError, { computer: Computer }>

export class CreateComputerUseCase implements UseCase {
  constructor(private readonly computerRepository: ComputerRepository) {}

  async execute(props: CreateComputerUseCaseProps): Promise<CreateComputerUseCaseResponse> {
    const findIp = await this.computerRepository.findByIpAddress(props.ipAddress)
    const findHostname = await this.computerRepository.findByHostname(props.hostname)
    const findTag = await this.computerRepository.findByTag(props.tag ?? '')

    if (findIp) {
      return failure(BadRequest('Computer already exists with this IP'))
    }

    if (findHostname) {
      return failure(BadRequest('Computer already exists with this hostname'))
    }

    if (findTag) {
      return failure(BadRequest('Computer already exists with this tag'))
    }

    const computer = Computer.create({
      ...props,
      modelSlug: Slug.createFromText(props.model),
      operatingSystem: Slug.createFromText(props.operatingSystem),
      contractId: props.contractId ? new UniqueEntityID(props.contractId) : null,
    })

    await this.computerRepository.create(computer)

    return success({ computer })
  }
}
