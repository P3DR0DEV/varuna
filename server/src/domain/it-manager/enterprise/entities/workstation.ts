import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface WorkstationProps {
  userId: UniqueEntityID
  deviceId: UniqueEntityID
  departmentId: UniqueEntityID
}

export class Workstation extends Entity<WorkstationProps> {
  get userId(): UniqueEntityID {
    return this.props.userId
  }

  get deviceId(): UniqueEntityID {
    return this.props.deviceId
  }

  get departmentId(): UniqueEntityID {
    return this.props.departmentId
  }

  static create(props: WorkstationProps, id?: UniqueEntityID) {
    const workstation = new Workstation(
      {
        ...props,
      },
      id,
    )
    return workstation
  }
}
