import { makeDevice } from 'test/factories/make-device'
import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'

import { GetDeviceBySerialumberUseCase } from '../get-device-by-serial-number'

let deviceRepository: InMemoryDeviceRepository
let sut: GetDeviceBySerialumberUseCase

describe(' Find device by serial number use case', () => {
  beforeEach(async () => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new GetDeviceBySerialumberUseCase(deviceRepository)

    const device = makeDevice({
      serialNumber: 'any_serial_number',
    })
    deviceRepository.create(device)
  })

  it('should be able to find device by serial number', async () => {
    const result = await sut.execute({ serialNumber: 'any_serial_number' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { device } = result.value

      expect(device.serialNumber).toEqual('any_serial_number')
      expect(device.id).toBeTruthy()
    }
  })

  it('should return an NotFoundError', async () => {
    const result = await sut.execute({ serialNumber: 'invalid_serial_number' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('NotFoundError')
    }
  })

  it('should return an BadRequestError', async () => {
    const result = await sut.execute({ serialNumber: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('BadRequestError')
    }
  })
})
