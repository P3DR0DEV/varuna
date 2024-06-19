import { makePrinter } from 'test/factories/make-printer'
import { InMemoryPrinterRepository } from 'test/repositories/in-memory-printer-repository'

import { FetchPrintersByPrintingOptionsUseCase } from '../fetch-printers-by-printing-options'

let printerRepository: InMemoryPrinterRepository
let sut: FetchPrintersByPrintingOptionsUseCase

describe('Find printers by printing option use case', () => {
  beforeEach(() => {
    printerRepository = new InMemoryPrinterRepository()
    sut = new FetchPrintersByPrintingOptionsUseCase(printerRepository)

    const printer = makePrinter()
    printerRepository.create(printer)
  })

  it('should find a colorful printer', async () => {
    const result = await sut.execute({ option: 'colorful' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { printers } = result.value
      printers.forEach((printer) => expect(printer.printing).toEqual('colorful'))
    }
  })

  it('should return a BadRequestError', async () => {
    const option = 'teste'

    // @ts-expect-error
    const result = await sut.execute({ option })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })

  it('should return a BadRequestError', async () => {
    const option = ''

    // @ts-expect-error
    const result = await sut.execute({ option })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
