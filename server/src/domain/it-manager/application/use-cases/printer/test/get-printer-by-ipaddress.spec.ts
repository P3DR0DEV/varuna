import { makePrinter } from 'test/factories/make-printer'
import { InMemoryPrinterRepository } from 'test/repositories/in-memory-printer-repository'

import { GetPrinterByIpAddressUseCase } from '../get-printer-by-ipaddress'

let printerRepository: InMemoryPrinterRepository
let sut: GetPrinterByIpAddressUseCase

describe('Get printer by ip address use case', () => {
  beforeEach(() => {
    printerRepository = new InMemoryPrinterRepository()
    sut = new GetPrinterByIpAddressUseCase(printerRepository)

    for (let i = 0; i < 10; i++) {
      const printer = makePrinter()
      printerRepository.create(printer)
    }
  })

  it('should get a printer by ip address', async () => {
    const item = printerRepository.items[0]

    // early return to test, the item has ip address
    if (!item.ipAddress) return

    const result = await sut.execute({ ipAddress: item.ipAddress })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { printer } = result.value
      expect(printer).toEqual(item)
    }
  })

  it('should return a NotFoundError', async () => {
    const ipAddress = 'invalid-ip-address'

    const result = await sut.execute({ ipAddress })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const ipAddress = ''

    const result = await sut.execute({ ipAddress })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
