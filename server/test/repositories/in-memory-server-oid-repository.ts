import type { ServerOidRepository } from '@/domain/it-manager/application/repositories/server-oid-repository'
import type { ServerOID } from '@/domain/it-manager/enterprise/entities/server-oid'

export class InMemoryServerOidRepository implements ServerOidRepository {
  public items: ServerOID[] = []

  async findByServer(serverId: string): Promise<ServerOID | null> {
    const serverOid = this.items.find((item) => item.serverId.toString() === serverId)
    if (!serverOid) {
      return null
    }
    return serverOid
  }

  async create(serverOid: ServerOID): Promise<void> {
    this.items.push(serverOid)
  }

  async save(serverOid: ServerOID): Promise<void> {
    const index = this.items.findIndex((item) => item.id === serverOid.id)

    this.items[index] = serverOid
  }
}
