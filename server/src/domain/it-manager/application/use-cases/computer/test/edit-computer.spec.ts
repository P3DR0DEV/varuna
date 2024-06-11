import { makeComputer } from 'test/factories/make-computer'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'

import { EditComputerUseCase } from '../edit-computer'

let computerRepository: InMemoryComputerRepository
let sut: EditComputerUseCase

describe('Edit computer use case', () => {
  beforeEach(async () => {
    computerRepository = new InMemoryComputerRepository()
    sut = new EditComputerUseCase(computerRepository)

    for (let i = 0; i < 3; i++) {
      const computer = makeComputer()

      await computerRepository.create(computer)
    }
  })

  it('should edit a computer', async () => {
    const computer = computerRepository.items[0]

    const result = await sut.execute({
      id: computer.id.toString(),
      type: computer.type,
      description: 'updated description',
      hostname: 'BHO010203',
      ipAddress: computer.ipAddress,
      operatingSystem: computer.operatingSystem,
      serialNumber: computer.serialNumber,
      contractId: computer.contractId,
      endWarrantyDate: computer.endWarrantyDate,
      invoiceNumber: computer.invoiceNumber,
      acquisitionDate: computer.acquisitionDate,
      model: computer.model,
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { computer } = result.value
      expect(computer.description).toBe('updated description')
    }
  })

  it('should return a error', async () => {
    const computer = computerRepository.items[0]

    const result = await sut.execute({
      id: 'invalid-id',
      type: computer.type,
      description: 'updated description',
      hostname: computer.hostname,
      ipAddress: computer.ipAddress,
      operatingSystem: computer.operatingSystem,
      serialNumber: computer.serialNumber,
      contractId: computer.contractId,
      endWarrantyDate: computer.endWarrantyDate,
      invoiceNumber: computer.invoiceNumber,
      acquisitionDate: computer.acquisitionDate,
      model: computer.model,
    })

    expect(result.isSuccess()).toBeFalsy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a bad request if id is empty', async () => {
    const computer = computerRepository.items[0]

    const result = await sut.execute({
      id: '',
      type: computer.type,
      description: 'updated description',
      hostname: computer.hostname,
      ipAddress: computer.ipAddress,
      operatingSystem: computer.operatingSystem,
      serialNumber: computer.serialNumber,
      contractId: computer.contractId,
      endWarrantyDate: computer.endWarrantyDate,
      invoiceNumber: computer.invoiceNumber,
      acquisitionDate: computer.acquisitionDate,
      model: computer.model,
    })

    expect(result.isSuccess()).toBeFalsy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })

  it('should return a bad request if tries to update to a ipAddress that already exists', async () => {
    const computer = computerRepository.items[0]

    const ipAddress = computerRepository.items[1].ipAddress

    const result = await sut.execute({
      id: computer.id.toString(),
      type: computer.type,
      description: 'updated description',
      hostname: computer.hostname,
      ipAddress,
      operatingSystem: computer.operatingSystem,
      serialNumber: computer.serialNumber,
      contractId: computer.contractId,
      endWarrantyDate: computer.endWarrantyDate,
      invoiceNumber: computer.invoiceNumber,
      acquisitionDate: computer.acquisitionDate,
      model: computer.model,
    })

    expect(result.isSuccess()).toBeFalsy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })

  it('should return a bad request if tries to update to a hostname that already exists', async () => {
    const computer = computerRepository.items[0]

    const hostname = computerRepository.items[1].hostname

    const result = await sut.execute({
      id: computer.id.toString(),
      type: computer.type,
      description: 'updated description',
      hostname,
      ipAddress: computer.ipAddress,
      operatingSystem: computer.operatingSystem,
      serialNumber: computer.serialNumber,
      contractId: computer.contractId,
      endWarrantyDate: computer.endWarrantyDate,
      invoiceNumber: computer.invoiceNumber,
      acquisitionDate: computer.acquisitionDate,
      model: computer.model,
    })

    expect(result.isSuccess()).toBeFalsy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
