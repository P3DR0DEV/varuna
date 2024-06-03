import { InMemoryContractRepository } from 'test/repositories/in-memory-contract-repository'
import { FindByUserEmailUseCase } from '../find-by-user-email'
import { RegisterContractUseCase } from '../register'

let sut: FindByUserEmailUseCase
let contractsRepository: InMemoryContractRepository
let register: RegisterContractUseCase

describe('Find all contracts by users email use case', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractRepository()
    sut = new FindByUserEmailUseCase(contractsRepository)
    register = new RegisterContractUseCase(contractsRepository)
  })

  it('should find all contracts by users email', async () => {
    for (let i = 0; i < 5; i++) {
      await register.execute({
        description: 'any_description',
        type: 'renting',
        userEmail: 'example@it.com.br',
        fileName: 'any_file_name',
        endsAt: new Date('2025-01-01'),
      })
    }
    await register.execute({
      description: 'any_description',
      type: 'renting',
      userEmail: 'pedro@it.com.br',
      fileName: 'any_file_name',
      endsAt: new Date('2025-01-01'),
    })

    const result = await sut.execute('pedro@it.com.br')

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contracts } = result.value
      expect(contracts).toHaveLength(1)

      expect(contracts[0].userEmail).toEqual('pedro@it.com.br')
    }
  })
})
