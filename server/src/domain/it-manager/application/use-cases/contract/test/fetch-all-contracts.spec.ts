import { makeContract } from 'test/factories/make-contract'
import { InMemoryContractRepository } from 'test/repositories/in-memory-contract-repository'

import { FetchAllContractsUseCase } from '../fetch-all-contracts'

let contractsRepository: InMemoryContractRepository
let sut: FetchAllContractsUseCase

describe('Find all contracts use case', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractRepository()
    sut = new FetchAllContractsUseCase(contractsRepository)

    for (let i = 0; i < 5; i++) {
      const contract = makeContract({
        userEmail: 'example@example.com',
      })
      contractsRepository.create(contract)
    }
  })

  it('should find all contracts', async () => {
    const result = await sut.execute({})

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contracts } = result.value

      expect(contracts).toHaveLength(5)
    }
  })

  it('should find all contracts with type', async () => {
    const result = await sut.execute({ type: 'borrowing' })
    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contracts } = result.value
      contracts.forEach((contract) => expect(contract.type).toEqual('borrowing'))
    }
  })

  it('should return a empty list', async () => {
    const result = await sut.execute({ userEmail: 'any_user_email' })
    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contracts } = result.value

      expect(contracts).toHaveLength(0)
    }
  })

  it('should return a list with 5 contracts', async () => {
    const result = await sut.execute({ userEmail: 'example@example.com' })
    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contracts } = result.value

      expect(contracts).toHaveLength(5)
    }
  })
})
