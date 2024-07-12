import { makeLicense } from 'test/factories/make-license'
import { InMemoryLicenseRepository } from 'test/repositories/in-memory-license-repository'

import { FetchAllLicensesUseCase } from '../fetch-all-licenses'

let licenseRepository: InMemoryLicenseRepository
let sut: FetchAllLicensesUseCase

describe('Find all licenses use case', () => {
  beforeEach(() => {
    licenseRepository = new InMemoryLicenseRepository()
    sut = new FetchAllLicensesUseCase(licenseRepository)

    for (let i = 0; i < 5; i++) {
      const license = makeLicense()
      licenseRepository.create(license)
    }
  })

  it('should find all licenses', async () => {
    const result = await sut.execute({})

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { licenses } = result.value
      expect(licenses).toHaveLength(5)
    }
  })
})
