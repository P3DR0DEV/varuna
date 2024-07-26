import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Phone } from './value-objects/phone'

export interface UserProps {
  name: string
  email: string
  phone: Phone | null
  badge: string
  departmentId: UniqueEntityID | null
  workstationId: UniqueEntityID | null
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get phone(): Phone | null {
    return this.props.phone
  }

  set phone(phone: Phone | null) {
    this.props.phone = phone
    this.touch()
  }

  get badge(): string {
    return this.props.badge
  }

  set badge(badge: string) {
    this.props.badge = badge
    this.touch()
  }

  get departmentId(): UniqueEntityID | null {
    return this.props.departmentId
  }

  set departmentId(departmentId: UniqueEntityID) {
    this.props.departmentId = departmentId
    this.touch()
  }

  get workstationId(): UniqueEntityID | null {
    return this.props.workstationId
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<UserProps, 'createdAt' | 'phone' | 'workstationId' | 'departmentId'>,
    id?: UniqueEntityID,
  ): User {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        workstationId: props.workstationId ?? null,
        departmentId: props.departmentId ?? null,
        phone: props.phone ?? null,
      },
      id,
    )
    return user
  }
}
