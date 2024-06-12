import { makeContract } from 'test/factories/make-contract'
import { InMemoryContractRepository } from 'test/repositories/in-memory-contract-repository'

import { FetchContractsByTypeUseCase } from '../fetch-contracts-by-type'

let sut: FetchContractsByTypeUseCase
let contractsRepository: InMemoryContractRepository

describe('Find by type use case', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractRepository()
    sut = new FetchContractsByTypeUseCase(contractsRepository)

    for (let i = 0; i < 5; i++) {
      const contract = makeContract({
        type: 'renting',
      })

      contractsRepository.create(contract)
    }

    for (let i = 0; i < 3; i++) {
      const contract = makeContract({
        type: 'borrowing',
      })

      contractsRepository.create(contract)
    }
  })

  it('should find all renting contracts', async () => {
    const result = await sut.execute({ type: 'renting' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contracts } = result.value
      expect(contracts).toHaveLength(5)
    }
  })

  it('should find all borrowing contracts', async () => {
    const result = await sut.execute({ type: 'borrowing' })

    if (result.isSuccess()) {
      const { contracts } = result.value
      expect(contracts).toHaveLength(3)
    }
  })

  it('should return BadRequest if type is invalid', async () => {
    // @ts-ignore
    const result = await sut.execute({ type: 'invalid' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
