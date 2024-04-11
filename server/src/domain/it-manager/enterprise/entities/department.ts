import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from './value-objects/slug'
import { Optional } from '@/core/types/optional'

export interface DepartmentProps {
  chiefId: UniqueEntityID | null
  description: string
  email?: string | null
  slug: Slug
  createdAt: Date
  updatedAt?: Date | null
}

export class Department extends Entity<DepartmentProps> {
  get chiefId(): UniqueEntityID | null {
    return this.props.chiefId
  }

  set chiefId(chiefId: UniqueEntityID | null) {
    this.props.chiefId = chiefId
    this.touch()
  }

  get description(): string {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.props.slug = Slug.createFromText(description)
    this.touch()
  }

  get email(): string | null | undefined {
    return this.props.email
  }

  set email(email: string | null) {
    this.props.email = email
    this.touch()
  }

  get slug(): Slug {
    return this.props.slug
  }

  set slug(slug: Slug) {
    this.props.slug = slug
    this.touch()
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

  static create(props: Optional<DepartmentProps, 'slug' | 'createdAt'>, id?: UniqueEntityID): Department {
    const department = new Department(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.description),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return department
  }
}
