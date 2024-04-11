import { UseCase } from '@/core/use-cases/use-case'
import { WorkstationRepository } from '../../repositories/workstation-repository'
import { Either, success } from '@/core/types/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

type RegisterProps = {
  userId: string
  deviceId: string
  departmentId: string
}

type RegisterUseCaseResponse = Promise<Either<unknown, { workstation: Workstation }>>

export class RegisterWorkstationUseCase implements UseCase {
  constructor(private readonly workstationRepository: WorkstationRepository) {}

  async execute(props: RegisterProps): Promise<RegisterUseCaseResponse> {
    const workstation = Workstation.create({
      userId: new UniqueEntityID(props.userId),
      deviceId: new UniqueEntityID(props.deviceId),
      departmentId: new UniqueEntityID(props.departmentId),
    })

    await this.workstationRepository.create(workstation)

    return success({ workstation })
  }
}
