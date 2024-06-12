import { makeDevice } from 'test/factories/make-device'
import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'

import { DeleteDeviceUseCase } from '../delete-device'

let deviceRepository: InMemoryDeviceRepository
let sut: DeleteDeviceUseCase

describe('Delete device use case', () => {
  beforeEach(async () => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new DeleteDeviceUseCase(deviceRepository)

    const device = makeDevice()
    deviceRepository.create(device)
  })

  it('should be able to delete a device', async () => {
    const id = deviceRepository.items[0].id.toString()

    // delete the device
    const result = await sut.execute({ id })

    expect(result.isSuccess()).toBeTruthy()
    if (result.isSuccess()) {
      const { message } = result.value
      expect(message).toEqual('Device deleted successfully')
    }
  })

  it('should return a NotFoundError', async () => {
    const id = deviceRepository.items[0].id.toString()

    // delete the device for the first time
    await sut.execute({ id })

    // tries to delete it again
    const result = await sut.execute({ id })
    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toBe('NotFoundError')
    }
  })

  it('should return an BadRequestError', async () => {
    const result = await sut.execute({ id: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toBe('BadRequestError')
    }
  })
})
