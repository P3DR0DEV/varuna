import { makeContract } from 'test/factories/make-contract'
import { InMemoryContractRepository } from 'test/repositories/in-memory-contract-repository'

import { GetContractByIdUseCase } from '../get-contract-by-id'

let contractsRepository: InMemoryContractRepository
let sut: GetContractByIdUseCase

describe('Find all contracts use case', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractRepository()
    sut = new GetContractByIdUseCase(contractsRepository)

    const contract = makeContract()
    contractsRepository.create(contract)
  })

  it('should find a contract by id', async () => {
    const id = contractsRepository.items[0].id
    const result = await sut.execute({ id: id.toString() })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contract } = result.value
      expect(contract.id).toEqual(contractsRepository.items[0].id)
    }
  })

  it('should return an NotFoundError', async () => {
    const result = await sut.execute({ id: 'any_id' })
    expect(result.isSuccess()).toBeFalsy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('NotFoundError')
    }
  })

  it('should return an BadRequestError', async () => {
    const result = await sut.execute({ id: '' })
    expect(result.isSuccess()).toBeFalsy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('BadRequestError')
    }
  })
})
