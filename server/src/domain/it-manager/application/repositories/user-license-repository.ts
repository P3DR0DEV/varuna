import type { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

export interface UserLicenseRepository {
  findByUserId(userId: string): Promise<UserLicense[]>
  findByLicenseId(licenseId: string): Promise<UserLicense | null>
  findById(id: string): Promise<UserLicense | null>

  create(userLicense: UserLicense): Promise<void>
  save(userLicense: UserLicense): Promise<void>
  delete(id: string): Promise<void>
}
