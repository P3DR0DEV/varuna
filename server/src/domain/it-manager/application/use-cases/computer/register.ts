import { UseCase } from '@/core/use-cases/use-case'
import { ComputerRepository } from '../../repositories/computer-repository'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'
import { Either, failure, success } from '@/core/types/either'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'

type RegisterUseCaseRequest = {
  hostname: string
  operatingSystem: string
  type: 'notebook' | 'desktop' | 'server'
  ipAddress: string
  description: string
  serialNumber: string
  model: string
  acquisitionDate: Date
  endWarrantyDate?: Date | null
  invoiceNumber?: string | null
  contractId?: string | null
}
type RegisterUseCaseResponse = Either<BadRequestError, { computer: Computer }>

export class RegisterUseCase implements UseCase {
  constructor(private computerRepository: ComputerRepository) {}

  async execute(props: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const findIp = await this.computerRepository.findByIpAddress(props.ipAddress)
    const findHostname = await this.computerRepository.findByHostname(props.hostname)

    if (findIp || findHostname) {
      return failure(BadRequest('Computer already exists with this IP or hostname'))
    }

    const computer = Computer.create({
      ...props,
      operatingSystem: Slug.createFromText(props.operatingSystem),
    })

    await this.computerRepository.create(computer)

    return success({ computer })
  }
}
