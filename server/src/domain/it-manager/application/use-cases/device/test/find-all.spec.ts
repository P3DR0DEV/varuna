import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'
import { FindAllUseCase } from '../find-all'
import { RegisterDeviceUseCase } from '../register'

let deviceRepository: InMemoryDeviceRepository
let sut: FindAllUseCase
let register: RegisterDeviceUseCase

describe('Find all use case', () => {
  beforeEach(() => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new FindAllUseCase(deviceRepository)
    register = new RegisterDeviceUseCase(deviceRepository)
  })

  it('should be able to find all devices', async () => {
    await register.execute({
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      serialNumber: 'any_serial_number',
      invoiceNumber: '20735',
    })

    const result = await sut.execute()

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { devices } = result.value
      expect(devices).toHaveLength(1)
    }
  })
})
