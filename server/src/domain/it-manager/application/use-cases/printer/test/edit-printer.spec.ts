import { makePrinter } from 'test/factories/make-printer'
import { InMemoryPrinterRepository } from 'test/repositories/in-memory-printer-repository'

import { EditPrinterUseCase } from '../edit-printer'

let printerRepository: InMemoryPrinterRepository
let sut: EditPrinterUseCase

describe('Edit printer use case', () => {
  beforeEach(() => {
    printerRepository = new InMemoryPrinterRepository()
    sut = new EditPrinterUseCase(printerRepository)

    for (let i = 0; i < 5; i++) {
      const printer = makePrinter()
      printerRepository.create(printer)
    }
  })

  it('should be able to edit a printer', async () => {
    const item = printerRepository.items[0]

    const result = await sut.execute({
      id: item.id.toString(),
      name: 'new-name',
      ipAddress: item.ipAddress,
      serialNumber: item.serialNumber,
      type: item.type,
      model: item.model,
      invoiceNumber: item.invoiceNumber,
      observations: item.observations,
      acquisitionDate: item.acquisitionDate,
      endWarrantyDate: item.endWarrantyDate,
      printing: item.printing,
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { printer } = result.value
      expect(printer.name).toEqual('new-name')
    }
  })

  it('should return a NotFoundError', async () => {
    const item = printerRepository.items[0]
    const id = 'invalid-id'

    const result = await sut.execute({
      id,
      name: 'new-name',
      ipAddress: item.ipAddress,
      serialNumber: item.serialNumber,
      type: item.type,
      model: item.model,
      invoiceNumber: item.invoiceNumber,
      observations: item.observations,
      acquisitionDate: item.acquisitionDate,
      endWarrantyDate: item.endWarrantyDate,
      printing: item.printing,
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError if changing name to an existing name', async () => {
    const item = printerRepository.items[0]
    const item2 = printerRepository.items[1]

    // tries to change the name to the name of another printer
    const result = await sut.execute({
      id: item.id.toString(),
      name: item2.name,
      ipAddress: item.ipAddress,
      serialNumber: item.serialNumber,
      type: item.type,
      model: item.model,
      invoiceNumber: item.invoiceNumber,
      observations: item.observations,
      acquisitionDate: item.acquisitionDate,
      endWarrantyDate: item.endWarrantyDate,
      printing: item.printing,
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('BadRequestError')
    }
  })

  it('should return a BadRequestError if changing ipAddress to an existing ipAddress', async () => {
    const item = printerRepository.items[0]
    const item2 = printerRepository.items[1]

    // tries to change the ipAdress to the ipAdress of another printer
    const result = await sut.execute({
      id: item.id.toString(),
      name: item.name,
      ipAddress: item2.ipAddress,
      serialNumber: item.serialNumber,
      type: item.type,
      model: item.model,
      invoiceNumber: item.invoiceNumber,
      observations: item.observations,
      acquisitionDate: item.acquisitionDate,
      endWarrantyDate: item.endWarrantyDate,
      printing: item.printing,
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('BadRequestError')
    }
  })

  it('should return a BadRequestError if changing SerialNumber to an existing SerialNumber', async () => {
    const item = printerRepository.items[0]
    const item2 = printerRepository.items[1]

    // tries to change the serialNumber to the serialNumber of another printer
    const result = await sut.execute({
      id: item.id.toString(),
      name: item.name,
      ipAddress: item.ipAddress,
      serialNumber: item2.serialNumber,
      type: item.type,
      model: item.model,
      invoiceNumber: item.invoiceNumber,
      observations: item.observations,
      acquisitionDate: item.acquisitionDate,
      endWarrantyDate: item.endWarrantyDate,
      printing: item.printing,
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('BadRequestError')
    }
  })

  it('should return a BadRequestError if changing name to an existing name', async () => {
    const item = printerRepository.items[0]
    const item2 = printerRepository.items[1]

    // tries to change the ipAdress to the ipAdress of another printer
    const result = await sut.execute({
      id: '',
      name: item.name,
      ipAddress: item2.ipAddress,
      serialNumber: item.serialNumber,
      type: item.type,
      model: item.model,
      invoiceNumber: item.invoiceNumber,
      observations: item.observations,
      acquisitionDate: item.acquisitionDate,
      endWarrantyDate: item.endWarrantyDate,
      printing: item.printing,
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('BadRequestError')
    }
  })
})
