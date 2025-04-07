import { failure, success, type Either } from '@/core/types/either'
import type { ServerOidRepository } from '../../repositories/server-oid-repository'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import type { ComputerRepository } from '../../repositories/computer-repository'

import { Session } from 'snmp-native'
import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'

type GetServerOidResponse = Either<BadRequestError | NotFoundError, { results: Array<unknown> }>
export class GetServerOidUseCase {
  constructor(
    private serverOidRepository: ServerOidRepository,
    private computerRepository: ComputerRepository,
  ) {}

  async execute(serverId: string): Promise<GetServerOidResponse> {
    const serverOid = await this.serverOidRepository.findByServer(serverId)

    if (!serverOid) {
      return failure(NotFound('server oid not found'))
    }

    const { oid } = serverOid

    const computer = await this.computerRepository.findById(serverId)

    if (!computer) {
      return failure(NotFound('computer not found'))
    }

    const session = new Session({
      host: computer.ipAddress,
      community: serverOid.community,
    })
    try {
      const results = await Promise.all(oid.map((oid) => this.getSnmpValue(session, oid)))

      return success({ results })
    } catch (error) {
      console.error('SNMP Error:', error)
      return failure(BadRequest('SNMP Error, either the community is invalid or the server is not reachable'))
    } finally {
      session.close()
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private getSnmpValue(session: Session, oid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      session.get({ oid }, (err, varbinds) => {
        if (err) {
          reject(err)
          return
        }
        resolve(varbinds.map((varbind) => varbind.value))
      })
    })
  }
}
