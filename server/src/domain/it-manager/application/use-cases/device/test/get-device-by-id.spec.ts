import { makeDevice } from 'test/factories/make-device'
import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'

import { GetDeviceByIdUseCase } from '../get-device-by-id'

let sut: GetDeviceByIdUseCase
let deviceRepository: InMemoryDeviceRepository

describe('Find by id use case', () => {
  beforeEach(async () => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new GetDeviceByIdUseCase(deviceRepository)

    const device = makeDevice()
    deviceRepository.create(device)
  })

  it('should be able to find device by id', async () => {
    const device = deviceRepository.items[0]
    const result = await sut.execute({ id: device.id.toString() })

    expect(result.isSuccess()).toBeTruthy()
    if (result.isSuccess()) {
      const { device } = result.value

      expect(device).toEqual(
        expect.objectContaining({
          id: device.id,
          model: device.model,
          acquisitionDate: device.acquisitionDate,
          serialNumber: device.serialNumber,
          invoiceNumber: device.invoiceNumber,
          endWarrantyDate: device.endWarrantyDate,
          createdAt: device.createdAt,
          modelSlug: device.modelSlug,
        }),
      )
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({ id: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toBe('BadRequestError')
    }
  })

  it('should return a NotFoundError', async () => {
    const result = await sut.execute({ id: 'invalid_id' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toBe('NotFoundError')
    }
  })
})
