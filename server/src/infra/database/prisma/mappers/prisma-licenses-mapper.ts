import { DATA_STATUS, License as PrismaLicense, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { License } from '@/domain/it-manager/enterprise/entities/license'

export class PrismaLicensesMapper {
  static toDomain(raw: PrismaLicense): License {
    const id = new UniqueEntityID(raw.id)
    const status = MapLicenseStatus.toDomain(raw.status)

    return License.create(
      {
        enterpriseName: raw.enterpriseName,
        name: raw.name,
        price: raw.price,
        quantity: raw.quantity,
        expiresAt: raw.expiresAt,
        status,
      },
      id,
    )
  }

  static toPersistence(license: License): Prisma.LicenseUncheckedCreateInput {
    return {
      id: license.id.toString(),
      enterpriseName: license.enterpriseName,
      name: license.name,
      price: license.price,
      quantity: license.quantity,
      expiresAt: license.expiresAt,
      status: MapLicenseStatus.toPersistence(license.status),
      userLicenseId: license.userLicenseId?.toString(),
    }
  }
}

export class MapLicenseStatus {
  static toDomain(status: DATA_STATUS): License['status'] {
    switch (status) {
      case 'ACTIVE':
        return 'active'
      case 'INACTIVE':
        return 'inactive'
      default:
        return 'active'
    }
  }

  static toPersistence(status: License['status']): DATA_STATUS {
    switch (status) {
      case 'active':
        return 'ACTIVE'
      case 'inactive':
        return 'INACTIVE'
      default:
        return 'ACTIVE'
    }
  }
}
