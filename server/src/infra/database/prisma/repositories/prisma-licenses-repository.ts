import { PrismaClient } from '@prisma/client'

import { LicenseRepository } from '@/domain/it-manager/application/repositories/license-repository'
import { License } from '@/domain/it-manager/enterprise/entities/license'

export class PrismaLicensesRepository implements LicenseRepository {
  constructor(private prisma: PrismaClient) {}

  findById(id: string): Promise<License | null> {
    throw new Error('Method not implemented.')
  }

  findMany(): Promise<License[]> {
    throw new Error('Method not implemented.')
  }

  findByName(licenseName: string): Promise<License | null> {
    throw new Error('Method not implemented.')
  }

  findByEnterprise(enterpriseName: string): Promise<License[]> {
    throw new Error('Method not implemented.')
  }

  create(license: License): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(license: License): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
