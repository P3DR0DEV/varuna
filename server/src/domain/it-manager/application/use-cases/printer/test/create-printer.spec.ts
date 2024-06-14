import { InMemoryPrinterRepository } from 'test/repositories/in-memory-printer-repository'

import { CreatePrinterUseCase } from '../create-printer'

let printerRepository: InMemoryPrinterRepository
let sut: CreatePrinterUseCase

describe('Create printer use case', () => {
  beforeEach(() => {
    printerRepository = new InMemoryPrinterRepository()
    sut = new CreatePrinterUseCase(printerRepository)
  })

  it('should be able to create a new printer', async () => {
    const result = await sut.execute({
      name: 'Printer 1',
      type: 'laser',
      printing: 'colorful',
      ipAddress: '237.84.2.178',
      acquisitionDate: new Date(),
      model: 'Model',
      endWarrantyDate: new Date('2030-01-01'),
      observations: 'Observations',
      serialNumber: '123456789',
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { printer } = result.value
      expect(printer).toEqual(
        expect.objectContaining({
          name: 'Printer 1',
          type: 'laser',
          printing: 'colorful',
          ipAddress: '237.84.2.178',
          model: 'Model',
        }),
      )
    }
  })

  it('should not be able to create a new printer with same name, serialNumber or ipaddress', async () => {
    await sut.execute({
      name: 'Printer 1',
      type: 'laser',
      printing: 'colorful',
      ipAddress: '237.84.2.178',
      acquisitionDate: new Date(),
      model: 'Model',
      endWarrantyDate: new Date('2030-01-01'),
      observations: 'Observations',
      serialNumber: '123456789',
    })

    const result = await sut.execute({
      name: 'Printer 1',
      type: 'laser',
      printing: 'colorful',
      ipAddress: '237.84.2.178',
      acquisitionDate: new Date(),
      model: 'Model',
      endWarrantyDate: new Date('2030-01-01'),
      observations: 'Observations',
      serialNumber: '123456789',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
