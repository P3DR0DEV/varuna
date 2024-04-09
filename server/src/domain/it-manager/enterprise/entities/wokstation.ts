import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface WorkstationProps {
  userId: UniqueEntityID
  deviceId: UniqueEntityID
  departmentId: UniqueEntityID
}

export class Workstation extends Entity<WorkstationProps> {
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
