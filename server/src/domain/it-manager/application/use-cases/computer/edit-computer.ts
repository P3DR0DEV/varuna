import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'
import { DeviceProps } from '@/domain/it-manager/enterprise/entities/device'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import { ComputerRepository } from '../../repositories/computer-repository'

type EditComputerUseCaseRequest = {
  id: string
  hostname: string
  ipAddress: string
  type: 'notebook' | 'desktop' | 'server'
  description: string
  operatingSystem: string
} & Omit<DeviceProps, 'id' | 'createdAt'>

type EditComputerUseCaseResponse = Either<BadRequestError | NotFoundError, { computer: Computer }>

export class EditComputerUseCase implements UseCase {
  constructor(private readonly computerRepository: ComputerRepository) {}

  async execute({
    id,
    hostname,
    ipAddress,
    type,
    description,
    operatingSystem,
    ...device
  }: EditComputerUseCaseRequest): Promise<EditComputerUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const computer = await this.computerRepository.findById(id)

    if (!computer) {
      return failure(NotFound('Computer not found'))
    }

    const computerWithSameHostname = await this.computerRepository.findByHostname(hostname)

    if (computerWithSameHostname && computerWithSameHostname.id !== computer.id) {
      return failure(BadRequest('Computer with this hostname already exists'))
    }

    const computerWithSameIpAddress = await this.computerRepository.findByIpAddress(ipAddress)

    if (computerWithSameIpAddress && computerWithSameIpAddress.id !== computer.id) {
      return failure(BadRequest('Computer with this hostname already exists'))
    }
    const slug = Slug.createFromText(operatingSystem)

    computer.hostname = hostname
    computer.type = type
    computer.ipAddress = ipAddress
    computer.description = description
    computer.operatingSystem = slug
    computer.acquisitionDate = device.acquisitionDate
    computer.serialNumber = device.serialNumber
    computer.invoiceNumber = device.invoiceNumber
    computer.model = device.model
    computer.endWarrantyDate = device.endWarrantyDate

    await this.computerRepository.save(computer)

    return success({ computer })
  }
}
