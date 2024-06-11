import { makeComputer } from 'test/factories/make-computer'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'

import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import { FetchAllComputersUseCase } from '../fetch-all-computers'

let computerRepository: InMemoryComputerRepository
let sut: FetchAllComputersUseCase

describe('Find all computers use case', () => {
  beforeEach(() => {
    computerRepository = new InMemoryComputerRepository()
    sut = new FetchAllComputersUseCase(computerRepository)

    for (let i = 0; i < 5; i++) {
      const computer = makeComputer()
      computerRepository.create(computer)
    }

    for (let i = 0; i < 3; i++) {
      const computer = makeComputer({ operatingSystem: Slug.createFromText('Windows 1995') })
      computerRepository.create(computer)
    }
  })

  it('should find all computers', async () => {
    const result = await sut.execute({})
    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { computers } = result.value

      expect(computers).toHaveLength(8)
    }
  })

  it('should find all computers with windows operating system', async () => {
    const result = await sut.execute({ operatingSystem: 'Windows 1995' })
    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { computers } = result.value

      expect(computers).toHaveLength(3)
    }
  })
})
