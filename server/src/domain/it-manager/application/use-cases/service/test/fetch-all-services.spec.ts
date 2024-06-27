import { makeService } from 'test/factories/make-service'
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository'

import { FetchAllServicesUseCase } from '../fetch-all-services'

let sut: FetchAllServicesUseCase
let serviceRepository: InMemoryServiceRepository

describe('Fetch all services use case', () => {
  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository()
    sut = new FetchAllServicesUseCase(serviceRepository)

    for (let i = 0; i < 10; i++) {
      const service = makeService()
      serviceRepository.create(service)
    }
  })

  it('should return 10 services', async () => {
    const result = await sut.execute()

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { services } = result.value
      expect(services).toHaveLength(10)
    }
  })
})
