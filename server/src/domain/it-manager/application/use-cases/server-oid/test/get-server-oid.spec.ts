import { OIDS } from '@/util/oids'
import { makeComputer } from 'test/factories/make-computer'
import { makeServerOid } from 'test/factories/make-server-oid'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { InMemoryServerOidRepository } from 'test/repositories/in-memory-server-oid-repository'
import { GetServerOidUseCase } from '../get-server-oid'

let serverOidRepository: InMemoryServerOidRepository
let computerRepository: InMemoryComputerRepository
let sut: GetServerOidUseCase

describe('Get server oids use case', () => {
  beforeAll(() => {
    serverOidRepository = new InMemoryServerOidRepository()
    computerRepository = new InMemoryComputerRepository()
    sut = new GetServerOidUseCase(serverOidRepository, computerRepository)

    const computer = makeComputer({
      type: 'server',
      ipAddress: '192.168.18.131',
    })

    computerRepository.create(computer)

    const serverOid = makeServerOid({
      serverId: computer.id,
      oid: [OIDS['system-name'], OIDS['system-description'], OIDS['system-uptime']],
    })
    serverOidRepository.create(serverOid)
  })

  it(
    'should be able to get server oids',
    async () => {
      const result = await sut.execute(computerRepository.items[0].id.toString())

      expect(result.isSuccess()).toBeTruthy()

      if (result.isFailure()) {
        return
      }

      const { results } = result.value

      expect(results).toHaveLength(3)
      console.log(results)
    },
    {
      timeout: 10000000,
    },
  )
})
