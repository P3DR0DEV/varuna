import { makeContract } from 'test/factories/make-contract'
import { InMemoryContractRepository } from 'test/repositories/in-memory-contract-repository'

import { EditContractUseCase } from '../edit-contract'

let sut: EditContractUseCase
let contractsRepository: InMemoryContractRepository

describe('Edit contract use case', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractRepository()
    sut = new EditContractUseCase(contractsRepository)

    const contract = makeContract()
    contractsRepository.create(contract)
  })

  it('should edit contract', async () => {
    const contract = contractsRepository.items[0]
    const result = await sut.execute({
      id: contract.id.toString(),
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
      const { name } = result.reason

      expect(name).toBe('NotFoundError')
    }
  })

  it('should return BadRequestError', async () => {
    const result = await sut.execute({
      id: '',
      description: 'any_description',
      type: 'renting',
      userEmail: 'any_user_email',
      fileName: 'any_file_name',
      endsAt: new Date('2025-01-01'),
      status: 'inactive',
    })

    expect(result.isSuccess()).toBeFalsy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toBe('BadRequestError')
    }
  })
})
