import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

import { WorkstationRepository } from '../../repositories/workstation-repository'

type GetWorkstationByIdUseCaseProps = {
  id: string
}
type GetWorkstationByIdUseCaseResponse = Either<BadRequestError | NotFoundError, { workstation: Workstation }>

export class GetWorkstationByIdUseCase implements UseCase {
  constructor(private readonly workstationRepository: WorkstationRepository) {}

  async execute({ id }: GetWorkstationByIdUseCaseProps): Promise<GetWorkstationByIdUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const workstation = await this.workstationRepository.findById(id)

    if (!workstation) {
      return failure(NotFound('Workstation not found'))
    }

    return success({ workstation })
  }
}
