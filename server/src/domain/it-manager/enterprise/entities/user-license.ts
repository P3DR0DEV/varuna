import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

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
