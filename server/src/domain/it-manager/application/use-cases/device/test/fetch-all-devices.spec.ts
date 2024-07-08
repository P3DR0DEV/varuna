import { makeDevice } from 'test/factories/make-device'
import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'

import { FetchAllDevicesUseCase } from '../fetch-all-devices'

let deviceRepository: InMemoryDeviceRepository
let sut: FetchAllDevicesUseCase

describe('Find all use case', () => {
  beforeEach(() => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new FetchAllDevicesUseCase(deviceRepository)

    const device = makeDevice({
      invoiceNumber: '123',
      model: 'Learning book 100e',
    })
    deviceRepository.create(device)
  })

  it('should be able to find all devices', async () => {
    const result = await sut.execute({})

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { devices } = result.value
      expect(devices).toHaveLength(1)
    }
  })

  it('should be able to find all devices by invoice number', async () => {
    const result = await sut.execute({ invoiceNumber: '123' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { devices } = result.value
      expect(devices).toHaveLength(1)
    }
  })

  it('should be able to find all devices by model', async () => {
    const result = await sut.execute({ model: 'Learning book 100e' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { devices } = result.value
      expect(devices).toHaveLength(1)
    }
  })
})
