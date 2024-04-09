import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface UserLicenseProps {
  userId: UniqueEntityID
  licenseId: UniqueEntityID
}

export class UserLicense extends Entity<UserLicenseProps> {
  static create(props: UserLicenseProps, id?: UniqueEntityID) {
    const userLicense = new UserLicense(
      {
        ...props,
      },
      id,
    )
    return userLicense
  }
}
