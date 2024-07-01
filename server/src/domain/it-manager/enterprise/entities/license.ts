import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Slug } from './value-objects/slug'

export interface LicenseProps {
  name: string
  quantity: number
  enterpriseName: string
  price: number
  createdAt: Date
  status: 'active' | 'inactive'
  userLicenseId: UniqueEntityID | null
  expiresAt: Date | null
  updatedAt?: Date | null
}

export class License extends Entity<LicenseProps> {
  constructor(props: LicenseProps, id?: UniqueEntityID) {
    super(props, id)

    this.name = Slug.createFromText(props.name).value
  }

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

  get expiresAt(): Date | null {
    return this.props.expiresAt
  }

  set expiresAt(_expiresAt: Date | null) {
    this.props.expiresAt = _expiresAt
    this.touch()
  }

  get status(): 'active' | 'inactive' {
    return this.props.status
  }

  set status(_status: 'active' | 'inactive') {
    this.props.status = _status
    this.touch()
  }

  get userLicenseId(): UniqueEntityID | null {
    return this.props.userLicenseId
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<LicenseProps, 'createdAt' | 'status' | 'expiresAt' | 'userLicenseId'>,
    id?: UniqueEntityID,
  ): License {
    const license = new License(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        expiresAt: props.expiresAt ?? null,
        status: props.status ?? 'active',
        userLicenseId: props.userLicenseId ?? null,
      },
      id,
    )
    return license
  }
}
