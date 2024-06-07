import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'
import { RegisterDeviceUseCase } from '../register'

let sut: RegisterDeviceUseCase
let deviceRepository: InMemoryDeviceRepository

describe('Register Device', () => {
  beforeEach(() => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new RegisterDeviceUseCase(deviceRepository)
  })
  it('should be able to register device', async () => {
    const result = await sut.execute({
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      serialNumber: 'any_serial_number',
      invoiceNumber: '20735',
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { device } = result.value

      expect(device.serialNumber).toEqual('any_serial_number')
    }
  })

  it('should not be able to register device with same serial number', async () => {
    await sut.execute({
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      serialNumber: 'any_serial_number',
      invoiceNumber: '20735',
    })

    const result = await sut.execute({
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      serialNumber: 'any_serial_number',
      invoiceNumber: '20735',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('BadRequestError')
    }
  })
})
