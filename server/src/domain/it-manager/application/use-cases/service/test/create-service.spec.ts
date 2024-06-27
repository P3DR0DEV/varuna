import { makeComputer } from 'test/factories/make-computer'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository'

import { CreateServiceUseCase } from '../create-service'

let sut: CreateServiceUseCase
let serviceRepository: InMemoryServiceRepository
let computerRepository: InMemoryComputerRepository

describe('Create service use case', () => {
  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository()
    computerRepository = new InMemoryComputerRepository()
    sut = new CreateServiceUseCase(serviceRepository, computerRepository)

    const computer = makeComputer()
    computerRepository.create(computer)
  })

  it('should be able to create a service', async () => {
    const computer = computerRepository.items[0]
    const result = await sut.execute({
      description: 'Relatório de Alunos gerados, utilizando NextJS e Fastify',
      ipAddress: computer.ipAddress,
      name: 'bho.relatórios.claretiano.edu.br',
      port: 443,
      type: 'application',
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { service } = result.value

      expect(service.id).toBeTruthy()
    }
  })
})
