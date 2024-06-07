import { Optional } from '@/core/types/optional'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

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

  set serialNumber(serialNumber: string) {
    this.props.serialNumber = serialNumber
    this.touch()
  }

  get model(): string {
    return this.props.model
  }

  set model(model: string) {
    this.props.model = model
    this.touch()
  }

  get acquisitionDate(): Date {
    return this.props.acquisitionDate
  }

  set acquisitionDate(acquisitionDate: Date) {
    this.props.acquisitionDate = acquisitionDate
    this.touch()
  }

  get endWarrantyDate(): Date | null | undefined {
    return this.props.endWarrantyDate
  }

  set endWarrantyDate(endWarrantyDate: Date | null | undefined) {
    this.props.endWarrantyDate = endWarrantyDate
    this.touch()
  }

  get invoiceNumber(): string | null | undefined {
    return this.props.invoiceNumber
  }

  set invoiceNumber(invoiceNumber: string | null | undefined) {
    this.props.invoiceNumber = invoiceNumber
    this.touch()
  }

  get contractId(): string | null | undefined {
    return this.props.contractId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  private touch(): void {
    this.props.updatedAt = new Date()
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
