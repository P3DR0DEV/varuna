import { PrismaClient } from '@prisma/client'

import { UserLicenseRepository } from '@/domain/it-manager/application/repositories/user-license-repository'
import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

export class PrismaUserLicenseRepository implements UserLicenseRepository {
  constructor(private prisma: PrismaClient) {}

  findByUserId(userId: string): Promise<UserLicense[]> {
    throw new Error('Method not implemented.')
  }

  findByLicenseId(licenseId: string): Promise<UserLicense | null> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<UserLicense | null> {
    throw new Error('Method not implemented.')
  }

  create(userLicense: UserLicense): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(userLicense: UserLicense): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
