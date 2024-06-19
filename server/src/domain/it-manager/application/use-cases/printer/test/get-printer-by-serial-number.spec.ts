import { makePrinter } from 'test/factories/make-printer'
import { InMemoryPrinterRepository } from 'test/repositories/in-memory-printer-repository'

import { GetPrinterBySerialNumberUseCase } from '../get-printer-by-serial-number'

let printerRepository: InMemoryPrinterRepository
let sut: GetPrinterBySerialNumberUseCase

describe('Find printer by serial number use case', () => {
  beforeEach(() => {
    printerRepository = new InMemoryPrinterRepository()
    sut = new GetPrinterBySerialNumberUseCase(printerRepository)

    const printer = makePrinter({ serialNumber: '1234' })
    printerRepository.create(printer)
  })

  it('should find printer by serial number', async () => {
    const result = await sut.execute({ serialNumber: '1234' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { printer } = result.value
      expect(printer.serialNumber).toEqual('1234')
    }
  })

  it('should return a NotFoundError', async () => {
    const serialNumber = 'invalid-serial-number'

    const result = await sut.execute({ serialNumber })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const serialNumber = ''

    const result = await sut.execute({ serialNumber })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
