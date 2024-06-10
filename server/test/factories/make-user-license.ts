import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserLicense, UserLicenseProps } from '@/domain/it-manager/enterprise/entities/user-license'

export function makeUserLicense(override: Partial<UserLicenseProps> = {}, id?: UniqueEntityID) {
  const userLicense = UserLicense.create(
    {
      userId: new UniqueEntityID(),
      licenseId: new UniqueEntityID(),
      departmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return userLicense
}
