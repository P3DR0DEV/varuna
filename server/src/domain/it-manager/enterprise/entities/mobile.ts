import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

import { Device, type DeviceProps } from './device'
import type { Phone } from './value-objects/phone'
import { Slug } from './value-objects/slug'

export type MobileTypes = 'cellphone' | 'tablet'
export interface MobileProps extends DeviceProps {
  name: string
  type: MobileTypes
  operatingSystem: Slug
  tag: string | null
  departmentId: UniqueEntityID | null
  number?: Phone | null
  numberProvider?: string | null
  createdAt: Date
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
    return this.props.operatingSystem.value
  }

  set operatingSystem(_operatingSystem: Slug) {
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

  get departmentId(): UniqueEntityID | null {
    return this.props.departmentId
  }

  set departmentId(departmentId: UniqueEntityID | null) {
    this.props.departmentId = departmentId
    this.touch()
  }

  static create(props: Optional<MobileProps, 'createdAt' | 'departmentId' | 'modelSlug' | 'tag'>, id?: UniqueEntityID) {
    const mobile = new Mobile(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        departmentId: props.departmentId ?? null,
        modelSlug: props.modelSlug ? props.modelSlug : Slug.createFromText(props.model),
        tag: props.tag ?? null,
      },
      id,
    )
    return mobile
  }
}
