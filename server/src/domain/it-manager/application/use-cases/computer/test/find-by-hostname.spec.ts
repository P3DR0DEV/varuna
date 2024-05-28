import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { RegisterUseCase } from '../register'
import { FindByHostnameUseCase } from '../find-by-hostname'

let computerRepository: InMemoryComputerRepository
let sut: FindByHostnameUseCase

describe('Find computer by hostname use case', () => {
  beforeEach(() => {
    computerRepository = new InMemoryComputerRepository()
    sut = new FindByHostnameUseCase(computerRepository)
  })

  it('should find one computer', async () => {
    const register = new RegisterUseCase(computerRepository)

    await register.execute({
      type: 'desktop',
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      description: 'any_description',
      hostname: 'BHO010201',
      ipAddress: '237.84.2.17',
      operatingSystem: 'Windows 11 Pro',
      serialNumber: 'any_serial_number',
      contractId: 'any_contract_id',
      endWarrantyDate: new Date('2028-01-01'),
      invoiceNumber: 'any_invoice_number',
    })

    const result = await sut.execute('BHO010201')

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { computer } = result.value

      expect(computer.hostname).toBe('BHO010201')
    }
  })

  it('Should return an error if computer not found', async () => {
    const result = await sut.execute('any_hostname')

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toBe('NotFoundError')
    }
  })
})
