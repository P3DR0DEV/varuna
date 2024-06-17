import { makePrinter } from 'test/factories/make-printer'
import { InMemoryPrinterRepository } from 'test/repositories/in-memory-printer-repository'

import { GetPrinterByNameUseCase } from '../get-printer-by-name'

let printerRepository: InMemoryPrinterRepository
let sut: GetPrinterByNameUseCase

describe('Find printer by name use case', () => {
  beforeEach(() => {
    printerRepository = new InMemoryPrinterRepository()
    sut = new GetPrinterByNameUseCase(printerRepository)

    const printer = makePrinter()
    printerRepository.create(printer)
  })

  it('should get a printer by name', async () => {
    const item = printerRepository.items[0]

    const result = await sut.execute({ name: item.name })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { printer } = result.value
      expect(printer).toEqual(item)
    }
  })

  it('should return a NotFoundError', async () => {
    const name = 'invalid-name'

    const result = await sut.execute({ name })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const name = ''

    const result = await sut.execute({ name })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
