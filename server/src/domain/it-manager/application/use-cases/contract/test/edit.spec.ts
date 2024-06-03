import { InMemoryContractRepository } from 'test/repositories/in-memory-contract-repository'
import { EditContractUseCase } from '../edit'
import { RegisterContractUseCase } from '../register'

let sut: EditContractUseCase
let contractsRepository: InMemoryContractRepository
let register: RegisterContractUseCase

describe('Edit contract use case', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractRepository()
    sut = new EditContractUseCase(contractsRepository)
    register = new RegisterContractUseCase(contractsRepository)
  })

  it('should edit contract', async () => {
    const contract = await register.execute({
      description: 'any_description',
      type: 'renting',
      userEmail: 'any_user_email',
      fileName: 'any_file_name',
      endsAt: new Date('2025-01-01'),
    })

    if (!contract.isSuccess()) return

    const result = await sut.execute({
      id: contract.value.contract.id.toString(),
      description: 'any_description',
      type: 'borrowing',
      userEmail: 'any_user_email',
      fileName: 'any_file_name',
      endsAt: new Date('2025-01-01'),
      status: 'inactive',
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { contract } = result.value
      expect(contract.status).toEqual('inactive')
    }
  })

  it('should return an NotFoundError', async () => {
    const result = await sut.execute({
      id: 'any_id',
      description: 'any_description',
      type: 'renting',
      userEmail: 'any_user_email',
      fileName: 'any_file_name',
      endsAt: new Date('2025-01-01'),
      status: 'inactive',
    })

    expect(result.isSuccess()).toBeFalsy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('NotFoundError')
    }
  })
})
