import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

export type ServiceTypes = 'application' | 'database' | 'infra'

export interface ServiceProps {
  name: string
  ipAddress: string
  port: number
  description: string
  type: ServiceTypes
  createdAt: Date
  updatedAt?: Date | null
}

export class Service extends Entity<ServiceProps> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get ipAddress(): string {
    return this.props.ipAddress
  }

  set ipAddress(_ipAddress) {
    this.props.ipAddress = _ipAddress
    this.touch()
  }

  get port(): number {
    return this.props.port
  }

  set port(_port: number) {
    this.props.port = _port
    this.touch()
  }

  get description(): string {
    return this.props.description
  }

  set description(_description: string) {
    this.props.description = _description
    this.touch()
  }

  get type(): ServiceTypes {
    return this.props.type
  }

  set type(_type: ServiceTypes) {
    this.props.type = _type
    this.touch()
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<ServiceProps, 'createdAt'>, id?: UniqueEntityID): Service {
    const service = new Service(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return service
  }
}
