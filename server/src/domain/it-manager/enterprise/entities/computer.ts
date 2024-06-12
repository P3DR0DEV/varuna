import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Device, DeviceProps } from './device'
import { Slug } from './value-objects/slug'

type ComputerTypes = 'notebook' | 'desktop' | 'server'

export interface ComputerProps extends DeviceProps {
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

  get operatingSystem(): string {
    return this.props.operatingSystem.value
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

  static create(props: Optional<ComputerProps, 'createdAt'>, id?: UniqueEntityID) {
    const computer = new Computer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return computer
  }
}
