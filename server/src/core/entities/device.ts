import { Entity } from './entity'

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

export abstract class Device<Props extends DeviceProps> extends Entity<Props> {
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
}
