import { makeDevice } from 'test/factories/make-device'
import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'

import { EditDeviceUseCase } from '../edit-device'

let sut: EditDeviceUseCase
let deviceRepository: InMemoryDeviceRepository

describe('Edit device use case', () => {
  beforeEach(async () => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new EditDeviceUseCase(deviceRepository)

    const device = makeDevice()
    deviceRepository.create(device)
  })

  it('should be able to edit a device', async () => {
    const device = deviceRepository.items[0]

    const result = await sut.execute({
      id: device.id.toString(),
      model: device.model,
      acquisitionDate: device.acquisitionDate,
      serialNumber: device.serialNumber,
      invoiceNumber: device.invoiceNumber,
      endWarrantyDate: new Date('2022-01-01'),
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { device } = result.value
      expect(device.endWarrantyDate).toEqual(new Date('2022-01-01'))
      expect(device.invoiceNumber).toEqual(device.invoiceNumber)

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

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({
      id: '',
      model: 'any_model',
      acquisitionDate: new Date('2022-01-01'),
      serialNumber: 'any_serial_number',
      invoiceNumber: '20735',
      endWarrantyDate: new Date('2022-01-01'),
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toBe('BadRequestError')
    }
  })
})
