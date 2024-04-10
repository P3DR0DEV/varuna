import { UserLicenseRepository } from '@/domain/it-manager/application/repositories/user-license-repository'
import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

export class InMemoryUserLicenseRepository implements UserLicenseRepository {
  public items: UserLicense[] = []

  async findByUserId(userId: string): Promise<UserLicense[]> {
    const userLicenses = this.items.filter((item) => item.userId.toString() === userId)

    return userLicenses
  }

  async findByLicenseId(licenseId: string): Promise<UserLicense | null> {
    const userLicense = this.items.find((item) => item.licenseId.toString() === licenseId)
    if (!userLicense) {
      return null
    }
    return userLicense
  }

  async create(userLicense: UserLicense): Promise<void> {
    this.items.push(userLicense)
  }

  async save(userLicense: UserLicense): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === userLicense.id)

    this.items[itemIndex] = userLicense
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(index, 1)
  }
}
