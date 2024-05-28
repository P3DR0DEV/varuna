import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { RegisterUseCase } from '../register'

let computerRepository: InMemoryComputerRepository
let sut: RegisterUseCase
describe('Register new Computer', async () => {
  beforeAll(async () => {
    computerRepository = new InMemoryComputerRepository()
    sut = new RegisterUseCase(computerRepository)
  })

  it('Should be able to register new computer', async () => {
    const result = await sut.execute({
      type: 'desktop',
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      description: 'any_description',
      hostname: 'BHO0102013',
      ipAddress: '237.84.2.178',
      operatingSystem: 'Windows 11 Pro',
      serialNumber: 'any_serial_number',
      contractId: 'any_contract_id',
      endWarrantyDate: new Date('2028-01-01'),
      invoiceNumber: 'any_invoice_number',
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { computer } = result.value

      expect(computer).toEqual(
        expect.objectContaining({
          type: 'desktop',
          model: 'any_model',
          acquisitionDate: new Date('2022-01-01'),
          description: 'any_description',
          hostname: 'BHO0102013',
          ipAddress: '237.84.2.178',
          operatingSystem: 'windows-11-pro',
          serialNumber: 'any_serial_number',
        }),
      )
    }
  })

  it('Should return an error if computer already exists', async () => {
    const result = await sut.execute({
      type: 'desktop',
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      description: 'any_description',
      hostname: 'BHO0102013',
      ipAddress: '237.84.2.178',
      operatingSystem: 'Windows 11 Pro',
      serialNumber: 'any_serial_number',
      contractId: 'any_contract_id',
      endWarrantyDate: new Date('2028-01-01'),
      invoiceNumber: 'any_invoice_number',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toBe('BadRequestError')
    }
  })
})
