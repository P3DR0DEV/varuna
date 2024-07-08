import { makeContract } from 'test/factories/make-contract'
import { InMemoryContractRepository } from 'test/repositories/in-memory-contract-repository'

import { EditContractStatusUseCase } from '../edit-contract-status'

let sut: EditContractStatusUseCase
let contractRepository: InMemoryContractRepository

describe('Edit contract status use case', () => {
  beforeEach(() => {
    contractRepository = new InMemoryContractRepository()
    sut = new EditContractStatusUseCase(contractRepository)

    const contract = makeContract()
    contractRepository.create(contract)
  })

  it('should be able to edit contract status', async () => {
    const result = await sut.execute({
      id: contractRepository.items[0].id.toString(),
      status: 'inactive',
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contract } = result.value

      expect(contract.status).toEqual('inactive')
    }
  })

  it('should not be able to edit contract status if contract not found', async () => {
    const result = await sut.execute({
      id: 'invalid-id',
      status: 'inactive',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toBe('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({
      id: '',
      status: 'inactive',
    })

    expect(result.isSuccess()).toBeFalsy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toBe('BadRequestError')
    }
  })
})
