import { Device, DeviceProps } from '@/core/entities/device'
import { Phone } from './value-objects/phone'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type MobileTypes = 'cellphone' | 'tablet'
interface MobileProps extends DeviceProps {
  name: string
  type: MobileTypes
  operatingSystem: string
  departmentId: UniqueEntityID
  number?: Phone | null
  numberProvider: string
}

export class Mobile extends Device<MobileProps> {
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
