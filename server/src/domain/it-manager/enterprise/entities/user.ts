import { Entity } from '@/core/entities/entity'
import { Phone } from './value-objects/phone'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface UserProps {
  name: string
  email: string
  phone?: Phone | null
  badge: string
  departmentId: UniqueEntityID
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

  get phone(): Phone | null | undefined {
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

  get departmentId(): UniqueEntityID {
    return this.props.departmentId
  }

  set departmentId(departmentId: UniqueEntityID) {
    this.props.departmentId = departmentId
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID): User {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return user
  }
}
