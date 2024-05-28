import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { FindManyUseCase } from '../find-many'
import { RegisterUseCase } from '../register'

let computerRepository: InMemoryComputerRepository
let sut: FindManyUseCase

describe('Find all computers use case', () => {
  beforeEach(() => {
    computerRepository = new InMemoryComputerRepository()
    sut = new FindManyUseCase(computerRepository)
  })

  it('should find all computers', async () => {
    const register = new RegisterUseCase(computerRepository)

    for (let i = 0; i < 5; i++) {
      await register.execute({
        type: 'desktop',
        model: 'any_model',
        acquisitionDate: new Date('2022-01-01'),
        description: 'any_description',
        hostname: 'BHO010201' + i,
        ipAddress: '237.84.2.17' + i,
        operatingSystem: 'Windows 11 Pro',
        serialNumber: 'any_serial_number' + i,
        contractId: 'any_contract_id',
        endWarrantyDate: new Date('2028-01-01'),
        invoiceNumber: 'any_invoice_number',
      })
    }
    const result = await sut.execute()
    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { computers } = result.value

      expect(computers).toHaveLength(5)
    }
  })
})
