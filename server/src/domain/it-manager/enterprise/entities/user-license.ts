import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

export interface UserLicenseProps {
  userId: UniqueEntityID
  licenseId: UniqueEntityID
  departmentId: UniqueEntityID
  createdAt: Date
}

export class UserLicense extends Entity<UserLicenseProps> {
  get userId(): UniqueEntityID {
    return this.props.userId
  }

  get licenseId(): UniqueEntityID {
    return this.props.licenseId
  }

  get departmentId(): UniqueEntityID {
    return this.props.departmentId
  }

  static create(props: Optional<UserLicenseProps, 'createdAt'>, id?: UniqueEntityID) {
    const userLicense = new UserLicense(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return userLicense
  }
}
