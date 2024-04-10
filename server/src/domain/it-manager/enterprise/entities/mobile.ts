import { Device, DeviceProps } from '@/core/entities/device'
import { Phone } from './value-objects/phone'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type MobileTypes = 'cellphone' | 'tablet'
interface MobileProps extends DeviceProps {
  name: string
  type: MobileTypes
  operatingSystem: string
  departmentId: UniqueEntityID
  number?: Phone | null
  numberProvider?: string | null
}

export class Mobile extends Device<MobileProps> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get type(): MobileTypes {
    return this.props.type
  }

  set type(_type: MobileTypes) {
    this.props.type = _type
    this.touch()
  }

  get numberProvider(): string | null | undefined {
    return this.props.numberProvider
  }

  set numberProvider(_numberProvider: string | null) {
    this.props.numberProvider = _numberProvider
  }

  get operatingSystem(): string {
    return this.props.operatingSystem
  }

  set operatingSystem(_operatingSystem: string) {
    this.props.operatingSystem = _operatingSystem
    this.touch()
  }

  get number(): Phone | null | undefined {
    return this.props.number
  }

  set number(phone: Phone | null) {
    this.props.number = phone
    this.touch()
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  get departmentId(): UniqueEntityID {
    return this.props.departmentId
  }

  static create(props: MobileProps, id?: UniqueEntityID) {
    const mobile = new Mobile(
      {
        ...props,
      },
      id,
    )
    return mobile
  }
}
