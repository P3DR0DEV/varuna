import { InMemoryContractRepository } from 'test/repositories/in-memory-contract-repository'
import { FindAllUseCase } from '../find-all'
import { RegisterContractUseCase } from '../register'

let contractsRepository: InMemoryContractRepository
let sut: FindAllUseCase
let register: RegisterContractUseCase

describe('Find all contracts use case', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractRepository()
    sut = new FindAllUseCase(contractsRepository)
    register = new RegisterContractUseCase(contractsRepository)
  })

  it('should find all contracts', async () => {
    for (let i = 0; i < 5; i++) {
      await register.execute({
        description: 'any_description',
        type: 'renting',
        userEmail: 'any_user_email',
        fileName: 'any_file_name',
        endsAt: new Date('2025-01-01'),
      })
    }

    const result = await sut.execute()

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contracts } = result.value

      expect(contracts).toHaveLength(5)
    }
  })
})
