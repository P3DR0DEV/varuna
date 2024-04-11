import { Optional } from '../../../../core/types/optional'
import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

export interface DeviceProps {
  serialNumber: string
  model: string
  acquisitionDate: Date
  endWarrantyDate?: Date | null
  invoiceNumber?: string | null
  contractId?: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Device<Props extends DeviceProps> extends Entity<Props> {
  get serialNumber(): string {
    return this.props.serialNumber
  }

  get model(): string {
    return this.props.model
  }

  get acquisitionDate(): Date {
    return this.props.acquisitionDate
  }

  get endWarrantyDate(): Date | null | undefined {
    return this.props.endWarrantyDate
  }

  get invoiceNumber(): string | null | undefined {
    return this.props.invoiceNumber
  }

  get contractId(): string | null | undefined {
    return this.props.contractId
  }

  static create(props: Optional<DeviceProps, 'createdAt'>, id?: UniqueEntityID) {
    const device = new Device(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return device
  }
}
