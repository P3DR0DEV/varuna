import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface IncidentProps {
  description: string
  workstationId: UniqueEntityID
  deviceId: UniqueEntityID | null
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

  get workstationId(): UniqueEntityID {
    return this.props.workstationId
  }

  set workstationId(_workstationId: UniqueEntityID) {
    this.props.workstationId = _workstationId
    this.touch()
  }

  get deviceId(): UniqueEntityID | null {
    return this.props.deviceId
  }

  set deviceId(_deviceId: UniqueEntityID | null) {
    this.props.deviceId = _deviceId
    this.touch()
  }

  get fixedAt(): Date | null | undefined {
    return this.props.fixedAt
  }

  set fixedAt(_fixedAt: Date | null) {
    this.props.fixedAt = _fixedAt
    this.touch()
  }

  setIncidentAsFixed(): void {
    this.props.fixedAt = new Date()
    this.touch()
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<IncidentProps, 'createdAt' | 'deviceId'>, id?: UniqueEntityID): Incident {
    const incident = new Incident(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        deviceId: props.deviceId ?? null,
      },
      id,
    )
    return incident
  }
}
