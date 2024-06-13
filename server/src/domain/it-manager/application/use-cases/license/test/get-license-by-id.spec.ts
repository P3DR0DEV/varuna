import { makeLicense } from 'test/factories/make-license'
import { InMemoryLicenseRepository } from 'test/repositories/in-memory-license-repository'

import { GetLicenseByIdUseCase } from '../get-license-by-id'

let licenseRepository: InMemoryLicenseRepository
let sut: GetLicenseByIdUseCase

describe('Get license by id use case', () => {
  beforeEach(() => {
    licenseRepository = new InMemoryLicenseRepository()
    sut = new GetLicenseByIdUseCase(licenseRepository)

    const license = makeLicense()

    licenseRepository.create(license)
  })

  it('should be able to get a license by id', async () => {
    const item = licenseRepository.items[0]

    const result = await sut.execute({ id: item.id.toString() })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { license } = result.value

      expect(license).toEqual(expect.objectContaining({ id: item.id, name: item.name, price: item.price }))
    }
  })

  it('should return an NotFoundError', async () => {
    const result = await sut.execute({ id: 'invalid_id' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return an BadRequestError', async () => {
    const result = await sut.execute({ id: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
