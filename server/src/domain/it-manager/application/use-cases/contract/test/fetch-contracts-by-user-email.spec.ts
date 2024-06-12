import { makeContract } from 'test/factories/make-contract'
import { InMemoryContractRepository } from 'test/repositories/in-memory-contract-repository'

import { FetchContractsByEmailUseCase } from '../fetch-contracts-by-user-email'

let sut: FetchContractsByEmailUseCase
let contractsRepository: InMemoryContractRepository

describe('Find all contracts by users email use case', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractRepository()
    sut = new FetchContractsByEmailUseCase(contractsRepository)

    const contract = makeContract({
      userEmail: 'pedro@it.com.br',
    })

    contractsRepository.create(contract)
  })

  it('should find all contracts by users email', async () => {
    const result = await sut.execute({ userEmail: 'pedro@it.com.br' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contracts } = result.value
      expect(contracts).toHaveLength(1)

      expect(contracts[0].userEmail).toEqual('pedro@it.com.br')
    }
  })

  it('should return BadRequestError', async () => {
    const result = await sut.execute({ userEmail: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toBe('BadRequestError')
    }
  })
})
