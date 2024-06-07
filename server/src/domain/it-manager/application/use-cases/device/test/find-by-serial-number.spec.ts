import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'
import { FindBySerialNumberUseCase } from '../find-by-serial-number'
import { RegisterDeviceUseCase } from '../register'

let deviceRepository: InMemoryDeviceRepository
let sut: FindBySerialNumberUseCase
let register: RegisterDeviceUseCase

describe(' Find device by serial number use case', () => {
  beforeEach(async () => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new FindBySerialNumberUseCase(deviceRepository)
    register = new RegisterDeviceUseCase(deviceRepository)

    await register.execute({
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      serialNumber: 'any_serial_number',
      invoiceNumber: '20735',
    })
  })
  it('should be able to find device by serial number', async () => {
    const result = await sut.execute('any_serial_number')

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { device } = result.value

      expect(device.serialNumber).toEqual('any_serial_number')
      expect(device.id).toBeTruthy()
    }
  })

  it('should return an NotFoundError', async () => {
    const result = await sut.execute('invalid_serial_number')

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('NotFoundError')
    }
  })

  it('should return an BadRequestError', async () => {
    const result = await sut.execute('')

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('BadRequestError')
    }
  })
})
