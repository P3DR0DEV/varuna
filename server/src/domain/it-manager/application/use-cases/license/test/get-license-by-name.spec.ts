import { makeLicense } from 'test/factories/make-license'
import { InMemoryLicenseRepository } from 'test/repositories/in-memory-license-repository'

import { GetLicenseByNameUseCase } from '../get-license-by-name'

let licenseRepository: InMemoryLicenseRepository
let sut: GetLicenseByNameUseCase

describe('Get license by name use case', () => {
  beforeEach(() => {
    licenseRepository = new InMemoryLicenseRepository()
    sut = new GetLicenseByNameUseCase(licenseRepository)

    const license = makeLicense()

    licenseRepository.create(license)
  })

  it('should be able to get a license by name', async () => {
    const item = licenseRepository.items[0]

    const result = await sut.execute({ name: item.name })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { license } = result.value

      expect(license).toEqual(
        expect.objectContaining({ id: item.id, name: item.name, price: item.price, quantity: item.quantity }),
      )
    }
  })

  it('should return an NotFoundError', async () => {
    const result = await sut.execute({ name: 'invalid_name' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('NotFoundError')
    }
  })

  it('should return an BadRequestError', async () => {
    const result = await sut.execute({ name: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('BadRequestError')
    }
  })
})
