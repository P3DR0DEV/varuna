import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'
import { FindByInvoiceNumberUseCase } from '../find-by-invoice-number'
import { RegisterDeviceUseCase } from '../register'

let sut: FindByInvoiceNumberUseCase
let register: RegisterDeviceUseCase
let deviceRepository: InMemoryDeviceRepository

describe('Find by Invoice Number UseCase', () => {
  beforeEach(async () => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new FindByInvoiceNumberUseCase(deviceRepository)
    register = new RegisterDeviceUseCase(deviceRepository)

    for (let i = 0; i < 5; i++) {
      await register.execute({
        model: 'any_model',
        acquisitionDate: new Date('2022-01-01'),
        serialNumber: 'any_serial_number' + i,
        invoiceNumber: '20735',
      })
    }
  })

  it('should be able to find devices by invoice number', async () => {
    const result = await sut.execute('20735')

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { devices } = result.value
      expect(devices).toHaveLength(5)
    }
  })
})
