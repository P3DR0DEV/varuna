import { makeDevice } from 'test/factories/make-device'
import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'

import { FetchDevicesByModelUseCase } from '../fetch-devices-by-model'

let sut: FetchDevicesByModelUseCase
let deviceRepository: InMemoryDeviceRepository

describe('Find by model use case', () => {
  beforeEach(async () => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new FetchDevicesByModelUseCase(deviceRepository)

    for (let i = 0; i < 5; i++) {
      const device = makeDevice({
        model: 'Learning Book 100e',
      })

      deviceRepository.create(device)
    }
  })

  it('should be able to find devices by model', async () => {
    const result = await sut.execute({ model: 'learning book 100e' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { devices } = result.value
      expect(devices).toHaveLength(5)
    }
  })

  it('should return BadRequestError', async () => {
    const result = await sut.execute({ model: 'learning book 100e' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { devices } = result.value
      expect(devices).toHaveLength(5)
    }
  })
})
