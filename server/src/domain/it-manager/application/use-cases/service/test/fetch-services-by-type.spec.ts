import { makeService } from 'test/factories/make-service'
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository'

import { FetchServicesByTypeUseCase } from '../fetch-services-by-type'

let sut: FetchServicesByTypeUseCase
let serviceRepository: InMemoryServiceRepository

describe('Fetch services by type use case', () => {
  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository()
    sut = new FetchServicesByTypeUseCase(serviceRepository)

    for (let i = 0; i < 10; i++) {
      const service = makeService({
        type: 'database',
      })
      serviceRepository.create(service)
    }
  })

  it('should be able to fetch services by type', async () => {
    const result = await sut.execute({ type: 'database' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { services } = result.value
      expect(services).toHaveLength(10)
    }
  })

  it('should return 0 services', async () => {
    const result = await sut.execute({ type: 'application' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { services } = result.value
      expect(services).toHaveLength(0)
    }
  })

  it('should return a BadRequestError', async () => {
    // @ts-expect-error
    const result = await sut.execute({ type: 'invalid_type' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toBe('BadRequestError')
    }
  })
})
