import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'
import { FindByModelUseCase } from '../find-by-model'
import { RegisterDeviceUseCase } from '../register'

let sut: FindByModelUseCase
let register: RegisterDeviceUseCase
let deviceRepository: InMemoryDeviceRepository

describe('Find by model use case', () => {
  beforeEach(async () => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new FindByModelUseCase(deviceRepository)
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

  it('should be able to find devices by model', async () => {
    const result = await sut.execute('any_model')

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { devices } = result.value
      expect(devices).toHaveLength(5)
    }
  })
})
