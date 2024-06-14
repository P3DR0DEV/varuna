import { makePrinter } from 'test/factories/make-printer'
import { InMemoryPrinterRepository } from 'test/repositories/in-memory-printer-repository'

import { DeletePrinterUseCase } from '../delete-printer'

let printerRepository: InMemoryPrinterRepository
let sut: DeletePrinterUseCase

describe('Delete printer use case', () => {
  beforeEach(() => {
    printerRepository = new InMemoryPrinterRepository()
    sut = new DeletePrinterUseCase(printerRepository)

    const printer = makePrinter()

    printerRepository.create(printer)
  })

  it('should delete a printer', async () => {
    const id = printerRepository.items[0].id.toString()

    const result = await sut.execute({ id })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { message } = result.value
      expect(message).toEqual('Printer deleted successfully')
    }
  })

  it('should return a NotFoundError', async () => {
    const id = printerRepository.items[0].id.toString()

    // delete the printer for the first time
    await sut.execute({ id })

    // tries to delete it again
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
