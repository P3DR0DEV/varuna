import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { EditComputerUseCase } from '../edit'
import { RegisterUseCase } from '../register'

let computerRepository: InMemoryComputerRepository
let sut: EditComputerUseCase

describe('Edit computer use case', () => {
  beforeEach(() => {
    computerRepository = new InMemoryComputerRepository()
    sut = new EditComputerUseCase(computerRepository)
  })
  it('should edit a computer', async () => {
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

    const result = await sut.execute({
      id: 'any_id',
      type: 'notebook',
      description: 'any_description',
      hostname: 'BHO010201',
      ipAddress: '237.84.2.178',
      operatingSystem: 'Windows 11 Pro',
    })

    expect(result.isSuccess()).toBeFalsy()
    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toBe('NotFoundError')
    }

    const result2 = await sut.execute({
      id: computerRepository.items[0].id.toString(),
      type: 'notebook',
      description: 'any_description',
      hostname: 'BHO010201',
      ipAddress: '237.84.2.178',
      operatingSystem: 'Windows 11 Pro',
    })
    expect(result2.isSuccess()).toBeTruthy()
  })
})
