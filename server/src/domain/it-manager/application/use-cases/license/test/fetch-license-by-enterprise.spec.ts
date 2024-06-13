import { makeLicense } from 'test/factories/make-license'
import { InMemoryLicenseRepository } from 'test/repositories/in-memory-license-repository'

import { FetchLicensesByEnterpriseUseCase } from '../fetch-licenses-by-enterprise'

let licenseRepository: InMemoryLicenseRepository
let sut: FetchLicensesByEnterpriseUseCase

describe('Fetch license by enterprise use case', () => {
  beforeEach(() => {
    licenseRepository = new InMemoryLicenseRepository()
    sut = new FetchLicensesByEnterpriseUseCase(licenseRepository)

    for (let i = 0; i < 5; i++) {
      const license = makeLicense({
        enterpriseName: 'Enterprise 1',
      })
      licenseRepository.create(license)
    }
  })
  it('should fetch license by enterprise', async () => {
    const result = await sut.execute({ enterpriseName: 'Enterprise 1' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { licenses } = result.value
      expect(licenses).toHaveLength(5)
    }
  })

  it('should return a bad request error if enterprise name is not provided', async () => {
    const result = await sut.execute({ enterpriseName: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('BadRequestError')
    }
  })
})
