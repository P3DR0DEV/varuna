import { UseCase } from '@/core/use-cases/use-case'
import { WorkstationRepository } from '../../repositories/workstation-repository'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type EditProps = {
  id: UniqueEntityID
  userId?: string
  deviceId?: string
  departmentId?: string
}

type EditUseCaseResponse = Either<NotFoundError, { workstation: Workstation }>

export class EditWorkstationUseCase implements UseCase {
  constructor(private readonly workstationRepository: WorkstationRepository) {}

  async execute(props: EditProps): Promise<EditUseCaseResponse> {
    const workstation = await this.workstationRepository.findById(props.id.toString())

    if (!workstation) {
      return failure(NotFound('Workstation not found'))
    }

    workstation.userId = props.userId ? new UniqueEntityID(props.userId) : workstation.userId
    workstation.deviceId = props.deviceId ? new UniqueEntityID(props.deviceId) : workstation.deviceId
    workstation.departmentId = props.departmentId ? new UniqueEntityID(props.departmentId) : workstation.departmentId

    await this.workstationRepository.save(workstation)

    return success({ workstation })
  }
}
