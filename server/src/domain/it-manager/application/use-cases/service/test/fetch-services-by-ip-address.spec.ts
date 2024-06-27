import { makeComputer } from 'test/factories/make-computer'
import { makeService } from 'test/factories/make-service'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository'

import { FetchServicesByIpAddressUseCase } from '../fetch-services-by-ip-address'

let sut: FetchServicesByIpAddressUseCase
let serviceRepository: InMemoryServiceRepository
let computerRepository: InMemoryComputerRepository

describe('Fetch services by ip address use case', () => {
  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository()
    computerRepository = new InMemoryComputerRepository()
    sut = new FetchServicesByIpAddressUseCase(serviceRepository, computerRepository)

    const computer = makeComputer()
    computerRepository.create(computer)

    for (let i = 0; i < 10; i++) {
      const service = makeService({ ipAddress: computer.ipAddress })

      serviceRepository.create(service)
    }
  })

  it('should return 10 services', async () => {
    const ipAddress = computerRepository.items[0].ipAddress

    const result = await sut.execute({ ipAddress })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { services } = result.value
      expect(services).toHaveLength(10)
    }
  })

  it('should return 0 services', async () => {
    // register a valid computer
    const computer = makeComputer()
    computerRepository.create(computer)

    // try to fetch services from an computer that does not have any
    const result = await sut.execute({ ipAddress: computer.ipAddress })

    // result still should be a success but with 0 services
    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { services } = result.value
      expect(services).toHaveLength(0)
    }
  })

  it('should return a NotFoundError', async () => {
    const result = await sut.execute({ ipAddress: 'invalid_ip_address' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toBe('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({ ipAddress: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toBe('BadRequestError')
    }
  })
})
