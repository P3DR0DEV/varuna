import { makeComputer } from 'test/factories/make-computer'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'

import { GetComputerByIpAddressUseCase } from '../get-computer-by-ip-address'

let computerRepository: InMemoryComputerRepository
let sut: GetComputerByIpAddressUseCase

describe('Find computer by ipaddress use case', () => {
  beforeEach(async () => {
    computerRepository = new InMemoryComputerRepository()
    sut = new GetComputerByIpAddressUseCase(computerRepository)

    const computer = makeComputer({
      ipAddress: '237.84.2.178',
    })

    computerRepository.create(computer)
  })

  it('should find one computer', async () => {
    const result = await sut.execute({ ipAddress: '237.84.2.178' })
    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { computer } = result.value

      expect(computer.ipAddress).toEqual('237.84.2.178')
    }
  })

  it('should return a NotFoundError', async () => {
    const result = await sut.execute({ ipAddress: 'invalid_ip_address' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({ ipAddress: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
