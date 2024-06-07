import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { RegisterUseCase } from '../register'
import { DeleteUseCase } from '../delete'

let computerRepository: InMemoryComputerRepository
let sut: DeleteUseCase
let register: RegisterUseCase

describe('Find computer by id use case', () => {
  beforeEach(async () => {
    computerRepository = new InMemoryComputerRepository()
    sut = new DeleteUseCase(computerRepository)
    register = new RegisterUseCase(computerRepository)

    for (let i = 0; i < 5; i++) {
      await register.execute({
        type: 'desktop',
        model: 'any_model',
        acquisitionDate: new Date('2022-01-01'),
        description: 'any_description',
        hostname: 'BHO010201' + i,
        ipAddress: '237.84.2.17' + i,
        operatingSystem: 'Windows 11 Pro',
        serialNumber: 'any_serial_number' + i,
        contractId: 'any_contract_id',
        endWarrantyDate: new Date('2028-01-01'),
        invoiceNumber: 'any_invoice_number',
      })
    }
  })

  it('should find one computer', async () => {
    const result = await sut.execute(computerRepository.items[0].id.toString())

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { message } = result.value

      expect(message).toEqual('Computer deleted successfully')
    }
  })

  it('should return a NotFoundError', async () => {
    const id = computerRepository.items[0].id.toString()

    // delete the computer for the first time
    await sut.execute(id)

    // tries to delete it again
    const result = await sut.execute(id)

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    // tries to delete an empty id
    const result = await sut.execute('')

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
