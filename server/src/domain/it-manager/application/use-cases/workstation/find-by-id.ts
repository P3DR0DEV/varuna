import { UseCase } from '@/core/use-cases/use-case'
import { WorkstationRepository } from '../../repositories/workstation-repository'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'

type FindByIdUseCaseResponse = Either<BadRequestError | NotFoundError, { workstation: Workstation }>

export class FindByIdUseCase implements UseCase {
  constructor(private readonly workstationRepository: WorkstationRepository) {}

  async execute(id: string): Promise<FindByIdUseCaseResponse> {
    if (!id) {
      return failure(NotFound('Id is required'))
    }

    const workstation = await this.workstationRepository.findById(id)

    if (!workstation) {
      return failure(BadRequest('Workstation not found'))
    }

    return success({ workstation })
  }
}
