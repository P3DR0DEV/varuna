import { InMemoryContractRepository } from 'test/repositories/in-memory-contract-repository'
import { FindByIdUseCase } from '../find-by-id'
import { RegisterContractUseCase } from '../register'

let contractsRepository: InMemoryContractRepository
let sut: FindByIdUseCase
let register: RegisterContractUseCase

describe('Find all contracts use case', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractRepository()
    sut = new FindByIdUseCase(contractsRepository)
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
    const result = await sut.execute(contractsRepository.items[0].id.toString())

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contract } = result.value
      expect(contract.id).toEqual(contractsRepository.items[0].id)
    }
  })

  it('should return an NotFoundError', async () => {
    const result = await sut.execute('any_id')
    expect(result.isSuccess()).toBeFalsy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('NotFoundError')
    }
  })

  it('should return an BadRequestError', async () => {
    const result = await sut.execute('')
    expect(result.isSuccess()).toBeFalsy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('BadRequestError')
    }
  })
})
