import { makeComputer } from 'test/factories/make-computer'
import { makeService } from 'test/factories/make-service'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository'

import { EditServiceUseCase } from '@/domain/it-manager/application/use-cases/service/edit-service'

let serviceRepository: InMemoryServiceRepository
let computerRepository: InMemoryComputerRepository
let sut: EditServiceUseCase

describe('Edit Service UseCase', () => {
  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository()
    computerRepository = new InMemoryComputerRepository()
    sut = new EditServiceUseCase(serviceRepository, computerRepository)

    const computer = makeComputer()
    computerRepository.create(computer)

    const service = makeService()
    serviceRepository.create(service)
  })

  it('should edit a service', async () => {
    const item = serviceRepository.items[0]

    const result = await sut.execute({
      id: item.id.toString(),
      description: item.description,
      ipAddress: computerRepository.items[0].ipAddress,
      name: item.name,
      port: item.port,
      type: item.type,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { service } = result.value
      expect(service.ipAddress).toEqual(computerRepository.items[0].ipAddress)
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({
      id: '',
      description: '',
      ipAddress: '',
      name: '',
      port: 0,
      type: 'application',
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toBe('BadRequestError')
    }
  })

  it('should return a NotFoundError when trying to edit a service that does not exist', async () => {
    const result = await sut.execute({
      id: 'invalid_id',
      description: '',
      ipAddress: '',
      name: '',
      port: 0,
      type: 'application',
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toBe('NotFoundError')
    }
  })

  it('should return a NotFoundError when trying to edit a service to a invalid ip address', async () => {
    const item = serviceRepository.items[0]

    // Should return not found error even with the valid ID, because the computer does not exist
    const result = await sut.execute({
      id: item.id.toString(),
      description: item.description,
      ipAddress: 'ip_that_does_not_exist',
      name: item.name,
      port: item.port,
      type: item.type,
    })

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toBe('NotFoundError')
    }
  })
})
