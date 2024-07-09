import { License } from '@/domain/it-manager/enterprise/entities/license'

export interface LicenseRepository {
  findById(id: string): Promise<License | null>
  findMany(enterpriseName?: string): Promise<License[]>
  findByName(licenseName: string): Promise<License | null>

  create(license: License): Promise<void>
  save(license: License): Promise<void>
}
