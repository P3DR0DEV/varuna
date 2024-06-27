import { makeService } from 'test/factories/make-service'
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository'

import { GetServiceByIdUseCase } from '../get-service-by-id'

let sut: GetServiceByIdUseCase
let serviceRepository: InMemoryServiceRepository

describe('Get service by id use case', () => {
  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository()
    sut = new GetServiceByIdUseCase(serviceRepository)

    const service = makeService()
    serviceRepository.create(service)
  })

  it('should be able to get a service by id', async () => {
    const id = serviceRepository.items[0].id.toString()

    const result = await sut.execute({ id })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { service } = result.value
      expect(service).toEqual(serviceRepository.items[0])
    }
  })

  it('should return a NotFoundError', async () => {
    const id = 'invalid-id'

    const result = await sut.execute({ id })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const id = ''

    const result = await sut.execute({ id })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
