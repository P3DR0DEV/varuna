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
      const contract = makeContract()
      contractsRepository.create(contract)
    }
  })

  it('should find all contracts', async () => {
    const result = await sut.execute()

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contracts } = result.value

      expect(contracts).toHaveLength(5)
    }
  })
})
