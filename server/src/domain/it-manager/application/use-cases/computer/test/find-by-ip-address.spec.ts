import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { RegisterUseCase } from '../register'
import { FindByIpAddressUseCase } from '../find-by-ip-address'

let computerRepository: InMemoryComputerRepository
let sut: FindByIpAddressUseCase

describe('Find computer by ipaddress use case', () => {
  beforeEach(() => {
    computerRepository = new InMemoryComputerRepository()
    sut = new FindByIpAddressUseCase(computerRepository)
  })

  it('should find one computer', async () => {
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
    const result = await sut.execute('237.84.2.170')
    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { computer } = result.value

      expect(computer.hostname).toEqual('BHO0102010')
    }
  })
})