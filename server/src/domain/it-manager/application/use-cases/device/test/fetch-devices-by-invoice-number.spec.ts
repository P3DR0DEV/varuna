import { makeDevice } from 'test/factories/make-device'
import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'

import { FetchDevicesByInvoiceNumberUseCase } from '../fetch-devices-by-invoice-number'

let sut: FetchDevicesByInvoiceNumberUseCase
let deviceRepository: InMemoryDeviceRepository

describe('Find by Invoice Number UseCase', () => {
  beforeEach(async () => {
    deviceRepository = new InMemoryDeviceRepository()
    sut = new FetchDevicesByInvoiceNumberUseCase(deviceRepository)

    for (let i = 0; i < 5; i++) {
      const device = makeDevice({
        invoiceNumber: '20735',
      })

      deviceRepository.create(device)
    }
  })

  it('should be able to find devices by invoice number', async () => {
    const result = await sut.execute({ invoiceNumber: '20735' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { devices } = result.value
      expect(devices).toHaveLength(5)
    }
  })

  it('should return BadRequestError', async () => {
    const result = await sut.execute({ invoiceNumber: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
