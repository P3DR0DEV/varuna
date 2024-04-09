import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface LicenseProps {
  name: string
  quantity: number
  enterpriseName: string
  price: number
  createdAt: Date
  expirationDate?: Date | null
  updatedAt?: Date | null
}

export class License extends Entity<LicenseProps> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get quantity(): number {
    return this.props.quantity
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity
    this.touch()
  }

  get enterpriseName(): string {
    return this.props.enterpriseName
  }

  set enterpriseName(_enterpriseName: string) {
    this.props.enterpriseName = _enterpriseName
    this.touch()
  }

  get price(): number {
    return this.props.price
  }

  set price(price: number) {
    this.props.price = price
    this.touch()
  }

  get expiration_date(): Date | null | undefined {
    return this.props.expirationDate
  }

  set expiration_date(_expirationDate: Date | null) {
    this.props.expirationDate = _expirationDate
    this.touch()
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<LicenseProps, 'createdAt'>, id?: UniqueEntityID): License {
    const license = new License(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return license
  }
}
