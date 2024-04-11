import { LicenseRepository } from '@/domain/it-manager/application/repositories/license-repository'
import { License } from '@/domain/it-manager/enterprise/entities/license'

export class InMemomryLicenseRepository implements LicenseRepository {
  public items: License[] = []
  async findById(id: string): Promise<License | null> {
    const license = this.items.find((item) => item.id.toString() === id)
    if (!license) {
      return null
    }
    return license
  }

  async findMany(): Promise<License[]> {
    return this.items
  }

  async findByName(licenseName: string): Promise<License | null> {
    const license = this.items.find((item) => item.name === licenseName)

    if (!license) {
      return null
    }
    return license
  }

  async findByEnterprise(enterpriseName: string): Promise<License[]> {
    const license = this.items.filter((item) => item.enterpriseName === enterpriseName)

    return license
  }

  async create(license: License): Promise<void> {
    this.items.push(license)
  }

  async save(license: License): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === license.id.toString())

    this.items[index] = license
  }
}