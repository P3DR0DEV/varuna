import { makeLicense } from 'test/factories/make-license'
import { InMemoryLicenseRepository } from 'test/repositories/in-memory-license-repository'

import { EditLicenseUseCase } from '../edit-license'

let licenseRepository: InMemoryLicenseRepository
let sut: EditLicenseUseCase

describe('Edit license use case', () => {
  beforeEach(() => {
    licenseRepository = new InMemoryLicenseRepository()
    sut = new EditLicenseUseCase(licenseRepository)

    const license = makeLicense()

    licenseRepository.create(license)
  })

  it('should edit license', async () => {
    const item = licenseRepository.items[0]
    const result = await sut.execute({
      id: item.id.toString(),
      name: 'any-license-name',
      quantity: 10,
      enterpriseName: 'any-enterprise-name',
      price: 10,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { license } = result.value
      expect(license).toEqual(
        expect.objectContaining({
          id: item.id,
          name: 'any-license-name',
          quantity: 10,
          enterpriseName: 'any-enterprise-name',
          price: 10,
        }),
      )
    }
  })

  it('should return NotFoundError', async () => {
    const result = await sut.execute({
      id: 'any-license-id',
      name: 'any-license-name',
      quantity: 10,
      enterpriseName: 'any-enterprise-name',
      price: 10,
      status: 'active',
      expirationDate: new Date(),
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })
})
