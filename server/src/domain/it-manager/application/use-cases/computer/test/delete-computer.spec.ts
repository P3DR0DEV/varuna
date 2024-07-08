import { makeComputer } from 'test/factories/make-computer'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'

import { DeleteComputerUseCase } from '../delete-computer'

let computerRepository: InMemoryComputerRepository
let sut: DeleteComputerUseCase

describe('Find computer by id use case', () => {
  beforeEach(async () => {
    computerRepository = new InMemoryComputerRepository()
    sut = new DeleteComputerUseCase(computerRepository)

    const computer = makeComputer()

    await computerRepository.create(computer)
  })

  it('should find one computer', async () => {
    const result = await sut.execute({ id: computerRepository.items[0].id.toString() })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { message } = result.value

      expect(message).toEqual('Computer deleted successfully')
    }
  })

  it('should return a NotFoundError', async () => {
    const id = computerRepository.items[0].id.toString()

    // delete the computer for the first time
    await sut.execute({ id })

    // tries to delete it again
    const result = await sut.execute({ id })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    // tries to delete an empty id
    const result = await sut.execute({ id: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
