import { makeComputer } from 'test/factories/make-computer'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'

import { GetComputerByTagUseCase } from '../get-computer-by-tag'

let sut: GetComputerByTagUseCase
let computerRepository: InMemoryComputerRepository

describe('Get computer by tag', () => {
  beforeEach(() => {
    computerRepository = new InMemoryComputerRepository()
    sut = new GetComputerByTagUseCase(computerRepository)

    const computer = makeComputer({
      tag: '060102',
    })

    computerRepository.create(computer)
  })

  it('should be able to get computer by tag', async () => {
    const result = await sut.execute({ tag: '060102' })

    expect(result.isFailure()).toBe(false)

    if (result.isSuccess()) {
      const { computer } = result.value

      expect(computer.tag).toEqual('060102')
    }
  })

  it('should a NotFoundError if computer not found', async () => {
    const result = await sut.execute({ tag: '060103' })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should a BadRequestError if tag is empty', async () => {
    const result = await sut.execute({ tag: '' })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
