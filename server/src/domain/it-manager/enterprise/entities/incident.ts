import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface IncidentProps {
  description: string
  workstationId: string
  deviceId?: string | null
  createdAt: Date
  fixedAt?: Date | null
  updatedAt?: Date | null
}

export class Incident extends Entity<IncidentProps> {
  get description(): string {
    return this.props.description
  }

  set description(_description: string) {
    this.props.description = _description
  }

  get workstationId(): string {
    return this.props.workstationId
  }

  get deviceId(): string | null | undefined {
    return this.props.deviceId
  }

  get fixedAt(): Date | null | undefined {
    return this.props.fixedAt
  }

  set fixedAt(_fixedAt: Date | null) {
    this.props.fixedAt = _fixedAt
  }

  static create(props: Optional<IncidentProps, 'createdAt'>, id?: UniqueEntityID): Incident {
    const incident = new Incident(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return incident
  }
}
