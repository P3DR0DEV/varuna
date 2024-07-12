import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Slug } from './value-objects/slug'

export interface DeviceProps {
  serialNumber: string
  model: string
  modelSlug: Slug
  tag?: string | null
  acquisitionDate: Date
  endWarrantyDate?: Date | null
  invoiceNumber?: string | null
  contractId?: UniqueEntityID | null
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
    this.modelSlug = model
    this.touch()
  }

  get modelSlug(): string {
    return this.props.modelSlug.value
  }

  private set modelSlug(model: string) {
    this.props.modelSlug = new Slug(model)
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
    return this.props.contractId?.toString()
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  get tag(): string | null | undefined {
    return this.props.tag
  }

  set tag(tag: string | null | undefined) {
    this.props.tag = tag
    this.touch()
  }

  protected touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<DeviceProps, 'createdAt' | 'modelSlug'| 'tag'>, id?: UniqueEntityID) {
    const device = new Device(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        modelSlug: props.modelSlug ? props.modelSlug : Slug.createFromText(props.model),
        tag: props.tag ?? null,
      },
      id,
    )
    return device
  }
}
