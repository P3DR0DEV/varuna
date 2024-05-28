import { UseCase } from '@/core/use-cases/use-case'
import { ComputerRepository } from '../../repositories/computer-repository'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'

type FindByHostnameUseCaseResponse = Either<NotFoundError | BadRequestError, { computer: Computer }>

export class FindByHostnameUseCase implements UseCase {
  constructor(private computerRepository: ComputerRepository) {}

  async execute(hostname: string): Promise<FindByHostnameUseCaseResponse> {
    if (!hostname) {
      return failure(BadRequest('Hostname is required'))
    }

    const computer = await this.computerRepository.findByHostname(hostname)

    if (!computer) {
      return failure(NotFound('Computer not found'))
    }

    return success({ computer })
  }
}
