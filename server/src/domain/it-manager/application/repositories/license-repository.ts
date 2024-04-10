import { License } from '@/domain/it-manager/enterprise/entities/license'

export interface LicenseRepository {
  findById(id: string): Promise<License | null>
  findMany(): Promise<License[]>
  findByName(licenseName: string): Promise<License | null>
  findByEnterprise(enterpriseName: string): Promise<License[]>

  create(license: License): Promise<void>
  save(license: License): Promise<void>
}
