import { InMemoryLicenseRepository } from 'test/repositories/in-memory-license-repository'

import { CreateLicenseUseCase } from '../create-license'

let licenseRepository: InMemoryLicenseRepository
let sut: CreateLicenseUseCase

describe('Create license use case', () => {
  beforeEach(() => {
    licenseRepository = new InMemoryLicenseRepository()
    sut = new CreateLicenseUseCase(licenseRepository)
  })

  it('should be able to create a license', async () => {
    const result = await sut.execute({
      name: 'any name',
      quantity: 1,
      enterpriseName: 'any_enterprise_name',
      price: 100,
      expiresAt: new Date('2025-01-01'),
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { license } = result.value

      expect(license).toEqual(
        expect.objectContaining({
          name: 'any-name',
          enterpriseName: 'any_enterprise_name',
          status: 'active',
          price: 100,
        }),
      )
    }
  })

  it('should return a BadRequestError', async () => {
    await sut.execute({
      name: 'any name',
      quantity: 1,
      enterpriseName: 'any_enterprise_name',
      price: 100,
      expiresAt: new Date('2025-01-01'),
    })

    const result = await sut.execute({
      name: 'any name',
      quantity: 1,
      enterpriseName: 'any_enterprise_name',
      price: 100,
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
