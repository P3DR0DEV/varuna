import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'
import { ComputerRepository } from '../../repositories/computer-repository'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

type EditComputerUseCaseRequest = {
  id: string
  hostname: string
  ipAddress: string
  type: 'notebook' | 'desktop' | 'server'
  description: string
  operatingSystem: string
}

type EditComputerUseCaseResponse = Either<BadRequestError | NotFoundError, { computer: Computer }>

export class EditComputerUseCase implements UseCase {
  constructor(private computerRepository: ComputerRepository) {}

  async execute({
    id,
    hostname,
    ipAddress,
    type,
    description,
    operatingSystem,
  }: EditComputerUseCaseRequest): Promise<EditComputerUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const computer = await this.computerRepository.findById(id)

    if (!computer) {
      return failure(NotFound('Computer not found'))
    }

    const slug = Slug.createFromText(operatingSystem)

    computer.hostname = hostname
    computer.type = type
    computer.ipAddress = ipAddress
    computer.description = description
    computer.operatingSystem = slug

    await this.computerRepository.save(computer)

    return success({ computer })
  }
}
