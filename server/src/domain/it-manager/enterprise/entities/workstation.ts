import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface WorkstationProps {
  computerId: UniqueEntityID
  departmentId: UniqueEntityID
  createdAt: Date
}

export class Workstation extends Entity<WorkstationProps> {
  get computerId(): UniqueEntityID {
    return this.props.computerId
  }

  set computerId(computerId: UniqueEntityID) {
    this.props.computerId = computerId
  }

  get departmentId(): UniqueEntityID {
    return this.props.departmentId
  }

  set departmentId(departmentId: UniqueEntityID) {
    this.props.departmentId = departmentId
  }

  static create(props: Optional<WorkstationProps, 'createdAt'>, id?: UniqueEntityID) {
    const workstation = new Workstation(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return workstation
  }
}
