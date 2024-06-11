import { makeComputer } from 'test/factories/make-computer'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'

import { GetComputerByHostNameUseCase } from '../get-computer-by-hostname'

let computerRepository: InMemoryComputerRepository
let sut: GetComputerByHostNameUseCase

describe('Find computer by hostname use case', () => {
  beforeEach(() => {
    computerRepository = new InMemoryComputerRepository()
    sut = new GetComputerByHostNameUseCase(computerRepository)
    const computer = makeComputer({ hostname: 'BHO010201' })

    computerRepository.create(computer)
  })

  it('should find one computer', async () => {
    const result = await sut.execute('BHO010201')

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { computer } = result.value
      expect(computer.hostname).toBe('BHO010201')
    }
  })

  it('Should return NotFoundError if computer not found', async () => {
    const result = await sut.execute('any_hostname')

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toBe('NotFoundError')
    }
  })

  it('Should return BadRequestError if hostname is empty', async () => {
    const result = await sut.execute('')

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toBe('BadRequestError')
    }
  })
})
