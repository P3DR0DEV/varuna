import { UseCase } from '@/core/use-cases/use-case'
import { ComputerRepository } from '../../repositories/computer-repository'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'

type FindByIdUseCaseResponse = Either<BadRequestError | NotFoundError, { computer: Computer }>

export class FindByIdUseCase implements UseCase {
  constructor(private computerRepository: ComputerRepository) {}

  async execute(id: string): Promise<FindByIdUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }
    const computer = await this.computerRepository.findById(id)

    if (!computer) {
      return failure(NotFound('Computer not found'))
    }

    return success({ computer })
  }
}
