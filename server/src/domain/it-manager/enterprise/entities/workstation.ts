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

  set userId(userId: UniqueEntityID) {
    this.props.userId = userId
  }

  get deviceId(): UniqueEntityID {
    return this.props.deviceId
  }

  set deviceId(deviceId: UniqueEntityID) {
    this.props.deviceId = deviceId
  }

  get departmentId(): UniqueEntityID {
    return this.props.departmentId
  }

  set departmentId(departmentId: UniqueEntityID) {
    this.props.departmentId = departmentId
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
