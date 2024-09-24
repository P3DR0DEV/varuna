import z from 'zod'

import { License } from '@/domain/it-manager/enterprise/entities/license'

export class LicensePresenter {
  static toHttp(license: License) {
    return {
      id: license.id.toString(),
      name: license.name,
      quantity: license.quantity,
      enterpriseName: license.enterpriseName,
      expiresAt: license.expiresAt,
      price: license.price,
      status: license.status,
      userLicenseId: license.userLicenseId ? license.userLicenseId.toString() : null,
    }
  }
}

export const licenseSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.coerce.number(),
  expiresAt: z.coerce.date().nullable(),
  enterpriseName: z.string(),
  price: z.coerce.number(),
  status: z.enum(['active', 'inactive']).nullish(),
  userLicenseId: z.string().nullable(),
})
