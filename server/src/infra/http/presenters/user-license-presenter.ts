import z from 'zod'

import type { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

export class UserLicensePresenter {
  static toHttp(userLicense: UserLicense) {
    return {
      id: userLicense.id.toString(),
      licenseId: userLicense.licenseId.toString(),
      userId: userLicense.userId.toString(),
      departmentId: userLicense.departmentId.toString(),
    }
  }
}

export const userLicenseSchema = z.object({
  id: z.string().uuid(),
  licenseId: z.string().uuid(),
  userId: z.string().uuid(),
  departmentId: z.string().uuid(),
})
