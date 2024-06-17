import { makePrinter } from 'test/factories/make-printer'
import { InMemoryPrinterRepository } from 'test/repositories/in-memory-printer-repository'

import { FetchPrintersByTypeUseCase } from '../fetch-printers-by-type'

let printerRepository: InMemoryPrinterRepository
let sut: FetchPrintersByTypeUseCase

describe('Find printers by type use case', () => {
  beforeEach(() => {
    printerRepository = new InMemoryPrinterRepository()
    sut = new FetchPrintersByTypeUseCase(printerRepository)

    for (let i = 0; i < 10; i++) {
      const printer = makePrinter()
      printerRepository.create(printer)
    }
  })

  it('should fetch printers by type', async () => {
    const result = await sut.execute({ type: 'laser' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { printers } = result.value

      printers.forEach((printer) => {
        expect(printer.type).toEqual('laser')
      })
    }
  })

  it('should return a BadRequestError', async () => {
    // @ts-expect-error
    const result = await sut.execute({ type: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })

  it('should return a NotFoundError', async () => {
    // @ts-expect-error
    const result = await sut.execute({ type: 'invalid-type' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
