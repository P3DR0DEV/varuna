import { InMemoryContractRepository } from 'test/repositories/in-memory-contract-repository'
import { FindByTypeUseCase } from '../find-by-type'
import { RegisterContractUseCase } from '../register'

let sut: FindByTypeUseCase
let contractsRepository: InMemoryContractRepository
let register: RegisterContractUseCase

describe('Find by type use case', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractRepository()
    register = new RegisterContractUseCase(contractsRepository)
    sut = new FindByTypeUseCase(contractsRepository)
  })

  it('should find all renting contracts', async () => {
    for (let i = 0; i < 5; i++) {
      await register.execute({
        description: 'any_description',
        type: 'renting',
        userEmail: 'any_user_email',
        fileName: 'any_file_name',
        endsAt: new Date('2025-01-01'),
      })
    }

    const result = await sut.execute('renting')

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contracts } = result.value
      expect(contracts).toHaveLength(5)
    }
  })

  it('should find all borrowing contracts', async () => {
    for (let i = 0; i < 5; i++) {
      await register.execute({
        description: 'any_description',
        type: 'borrowing',
        userEmail: 'any_user_email',
        fileName: 'any_file_name',
        endsAt: new Date('2025-01-01'),
      })
    }

    const result = await sut.execute('borrowing')

    if (result.isSuccess()) {
      const { contracts } = result.value
      expect(contracts).toHaveLength(5)
    }
  })
})
