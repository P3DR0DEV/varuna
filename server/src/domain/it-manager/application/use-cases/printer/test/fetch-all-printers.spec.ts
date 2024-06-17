import { makePrinter } from 'test/factories/make-printer'
import { InMemoryPrinterRepository } from 'test/repositories/in-memory-printer-repository'

import { FetchAllPrintersUseCase } from '../fetch-all-printers'

let printerRepository: InMemoryPrinterRepository
let sut: FetchAllPrintersUseCase

describe('Fetch all printers use case', () => {
  beforeEach(() => {
    printerRepository = new InMemoryPrinterRepository()
    sut = new FetchAllPrintersUseCase(printerRepository)

    for (let i = 0; i < 5; i++) {
      const printer = makePrinter()
      printerRepository.create(printer)
    }
  })

  it('should fetch all printers', async () => {
    const result = await sut.execute()

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { printers } = result.value
      expect(printers).toHaveLength(5)
    }
  })
})
