import { InMemoryContractRepository } from 'test/repositories/in-memory-contract-repository'
import { RegisterContractUseCase } from '../register'

let contractRepository: InMemoryContractRepository
let sut: RegisterContractUseCase

describe('Register contract use case', () => {
  beforeEach(() => {
    contractRepository = new InMemoryContractRepository()
    sut = new RegisterContractUseCase(contractRepository)
  })
  it('should be able to register a contract', async () => {
    const result = await sut.execute({
      description: 'any_description',
      type: 'renting',
      userEmail: 'any_user_email',
      fileName: 'any_file_name',
      endsAt: new Date('2025-01-01'),
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contract } = result.value

      expect(contract.status).toEqual('active')
    }
  })
})
