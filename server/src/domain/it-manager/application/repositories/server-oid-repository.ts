import type { ServerOID } from '../../enterprise/entities/server-oid'

export interface ServerOidRepository {
  findByServer(serverId: string): Promise<ServerOID | null>

  create(serverOid: ServerOID): Promise<void>
  save(serverOid: ServerOID): Promise<void>
}
