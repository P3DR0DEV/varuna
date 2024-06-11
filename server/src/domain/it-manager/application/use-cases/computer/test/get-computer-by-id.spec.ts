import { makeComputer } from 'test/factories/make-computer'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'

import { GetComputerByIdUseCase } from '../get-computer-by-id'

let computerRepository: InMemoryComputerRepository
let sut: GetComputerByIdUseCase

describe('Find computer by id use case', () => {
  beforeEach(async () => {
    computerRepository = new InMemoryComputerRepository()
    sut = new GetComputerByIdUseCase(computerRepository)

    const computer = makeComputer({
      hostname: 'BHO0102010',
    })

    computerRepository.create(computer)
  })

  it('should find one computer', async () => {
    const id = computerRepository.items[0].id.toString()
    const result = await sut.execute({ id })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { computer } = result.value

      expect(computer.hostname).toEqual('BHO0102010')
    }
  })

  it('should return a NotFoundError', async () => {
    const result = await sut.execute({ id: 'invalid_id' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toBe('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({ id: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
