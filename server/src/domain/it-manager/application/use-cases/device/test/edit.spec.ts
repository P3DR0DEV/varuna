import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'
import { EditDeviceUseCase } from '../edit'
import { RegisterDeviceUseCase } from '../register'

let sut: EditDeviceUseCase
let deviceRepository: InMemoryDeviceRepository
let register: RegisterDeviceUseCase

describe('Edit device use case', () => {
  beforeEach(async () => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new EditDeviceUseCase(deviceRepository)
    register = new RegisterDeviceUseCase(deviceRepository)
    await register.execute({
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      serialNumber: 'any_serial_number',
      invoiceNumber: '20735',
    })
  })

  it('should be able to edit a device', async () => {
    const result = await sut.execute({
      id: deviceRepository.items[0].id.toString(),
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      serialNumber: 'any_serial_number',
      invoiceNumber: '20735',
      endWarrantyDate: new Date('2022-01-01'),
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { device } = result.value
      expect(device.endWarrantyDate).toEqual(new Date('2022-01-01'))

      expect(device.updatedAt).toBeTruthy()
    }
  })

  it('should return a NotFoundError', async () => {
    const result = await sut.execute({
      id: 'invalid_id',
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      serialNumber: 'any_serial_number',
      invoiceNumber: '20735',
      endWarrantyDate: new Date('2022-01-01'),
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toBe('NotFoundError')
    }
  })
})
