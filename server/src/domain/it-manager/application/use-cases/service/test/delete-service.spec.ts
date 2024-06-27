import { makeService } from 'test/factories/make-service'
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository'

import { DeleteServiceUseCase } from '../delete-service'

let serviceRepository: InMemoryServiceRepository
let sut: DeleteServiceUseCase

describe('Delete Service UseCase', () => {
  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository()
    sut = new DeleteServiceUseCase(serviceRepository)

    const service = makeService()
    serviceRepository.create(service)
  })

  it('should be able to delete a service', async () => {
    const id = serviceRepository.items[0].id.toString()
    const result = await sut.execute({
      id,
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { message } = result.value
      expect(message).toEqual('Service deleted successfully')
    }
  })

  it('should return a NotFoundError when trying to delete a service that already has been deleted', async () => {
    const id = serviceRepository.items[0].id.toString()
    // delete the service for the first time
    await sut.execute({
      id,
    })

    // tries to delete it again
    const result = await sut.execute({
      id,
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const id = ''

    const result = await sut.execute({
      id,
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('BadRequestError')
    }
  })
})
