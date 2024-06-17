import { makePrinter } from 'test/factories/make-printer'
import { InMemoryPrinterRepository } from 'test/repositories/in-memory-printer-repository'

import { GetPrinterByIdUseCase } from '../get-printer-by-id'

let printerRepository: InMemoryPrinterRepository
let sut: GetPrinterByIdUseCase

describe('Find printerby id use case', () => {
  beforeEach(() => {
    printerRepository = new InMemoryPrinterRepository()
    sut = new GetPrinterByIdUseCase(printerRepository)

    for (let i = 0; i < 5; i++) {
      const printer = makePrinter()
      printerRepository.create(printer)
    }
  })

  it('should get a printer by id', async () => {
    const item = printerRepository.items[0]

    const result = await sut.execute({ id: item.id.toString() })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { printer } = result.value
      expect(printer).toEqual(item)
    }
  })

  it('should return a NotFoundError', async () => {
    const id = 'invalid-id'

    const result = await sut.execute({ id })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const id = ''

    const result = await sut.execute({ id })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
