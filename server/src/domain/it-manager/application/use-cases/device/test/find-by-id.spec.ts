import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'
import { FindByIdUseCase } from '../find-by-id'
import { RegisterDeviceUseCase } from '../register'

let sut: FindByIdUseCase
let register: RegisterDeviceUseCase
let deviceRepository: InMemoryDeviceRepository

describe('Find by id use case', () => {
  beforeEach(async () => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new FindByIdUseCase(deviceRepository)
    register = new RegisterDeviceUseCase(deviceRepository)

    await register.execute({
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      serialNumber: 'any_serial_number',
      invoiceNumber: '20735',
    })
  })

  it('should be able to find device by id', async () => {
    const device = await register.execute({
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      serialNumber: '123214213',
      invoiceNumber: '20735',
    })

    const result = await sut.execute(device.isSuccess() ? device.value.device.id.toString() : '')
    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { device } = result.value
      expect(device.serialNumber).toEqual('123214213')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute('')

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toBe('BadRequestError')
    }
  })

  it('should return a NotFoundError', async () => {
    const result = await sut.execute('invalid_id')

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toBe('NotFoundError')
    }
  })
})
