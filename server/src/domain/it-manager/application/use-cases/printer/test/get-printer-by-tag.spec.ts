import { makePrinter } from 'test/factories/make-printer'
import { InMemoryPrinterRepository } from 'test/repositories/in-memory-printer-repository'

import { GetPrinterByTagUseCase } from '../get-printer-by-tag'

let sut: GetPrinterByTagUseCase
let printersRepository: InMemoryPrinterRepository

describe('Get printer by tag', () => {
  beforeEach(() => {
    printersRepository = new InMemoryPrinterRepository()
    sut = new GetPrinterByTagUseCase(printersRepository)

    const printer = makePrinter({
      tag: '010203',
    })

    printersRepository.create(printer)
  })

  it('should be able to get a printer by tag', async () => {
    const result = await sut.execute({
      tag: '010203',
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { printer } = result.value

      expect(printer.tag).toEqual('010203')
    }
  })

  it('should return a NotFoundError if printer not found', async () => {
    const result = await sut.execute({
      tag: '010204',
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({
      tag: '',
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('BadRequestError')
    }
  })
})
