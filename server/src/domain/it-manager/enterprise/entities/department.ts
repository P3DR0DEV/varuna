import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Slug } from './value-objects/slug'

export interface DepartmentProps {
  chiefId: UniqueEntityID | null
  description: string
  name: string
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

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.props.slug = Slug.createFromText(name)
    this.touch()
  }

  get description(): string {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get email(): string | null | undefined {
    return this.props.email
  }

  set email(email: string | null | undefined) {
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

  static create(props: Optional<DepartmentProps, 'slug' | 'createdAt' | 'chiefId'>, id?: UniqueEntityID): Department {
    const department = new Department(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        createdAt: props.createdAt ?? new Date(),
        chiefId: props.chiefId ?? null,
      },
      id,
    )
    return department
  }
}
