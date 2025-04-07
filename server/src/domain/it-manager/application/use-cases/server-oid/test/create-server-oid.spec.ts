import { InMemoryServerOidRepository } from 'test/repositories/in-memory-server-oid-repository'
import { CreateServerOidUseCase } from '../create-server-oid'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { makeComputer } from 'test/factories/make-computer'
import { OIDS } from '@/util/oids'

let serverOidRepository: InMemoryServerOidRepository
let computerRepository: InMemoryComputerRepository
let sut: CreateServerOidUseCase

describe('Create printer use case', () => {
  beforeEach(() => {
    serverOidRepository = new InMemoryServerOidRepository()
    computerRepository = new InMemoryComputerRepository()
    sut = new CreateServerOidUseCase(serverOidRepository, computerRepository)

    const computer = makeComputer({
      type: 'server',
    })
    computerRepository.create(computer)
  })

  it('should be able to create a server oid relation', async () => {
    const server = computerRepository.items[0]
    const result = await sut.execute({
      serverId: server.id.toString(),
      oid: [OIDS['system-name']],
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { serverOID } = result.value
      console.log(serverOID.oid)

      expect(serverOID.id).toBeTruthy()
    }
  })
})
