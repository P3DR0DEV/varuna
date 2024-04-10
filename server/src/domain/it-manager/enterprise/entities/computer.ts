import { Device, DeviceProps } from '@/core/entities/device'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Slug } from './value-objects/slug'

type ComputerTypes = 'notebook' | 'desktop' | 'server'

interface ComputerProps extends DeviceProps {
  hostname: string
  operatingSystem: Slug
  type: ComputerTypes
  ipAddress: string
  description: string
}
export class Computer extends Device<ComputerProps> {
  get hostname(): string {
    return this.props.hostname
  }

  set hostname(_hostname: string) {
    this.props.hostname = _hostname
    this.touch()
  }

  get operatingSystem(): Slug {
    return this.props.operatingSystem
  }

  set operatingSystem(_operatingSystem: Slug) {
    this.props.operatingSystem = _operatingSystem
    this.touch()
  }

  get type(): ComputerTypes {
    return this.props.type
  }

  set type(_type: ComputerTypes) {
    this.props.type = _type
  }

  get ipAddress(): string {
    return this.props.ipAddress
  }

  set ipAddress(_ipAddress: string) {
    this.props.ipAddress = _ipAddress
  }

  get description(): string {
    return this.props.description
  }

  set description(_description: string) {
    this.props.description = _description
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<ComputerProps, 'createdAt'>, id?: UniqueEntityID) {
    const computer = new Computer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        operatingSystem: props.operatingSystem ?? Slug.createFromText(props.operatingSystem),
      },
      id,
    )
    return computer
  }
}
