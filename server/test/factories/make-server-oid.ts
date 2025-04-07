import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ServerOID } from '@/domain/it-manager/enterprise/entities/server-oid'
import { OIDS } from '@/util/oids'
import { faker } from '@faker-js/faker'

export function makeServerOid(override: Partial<ServerOID> = {}, id?: UniqueEntityID) {
  const serverOid = ServerOID.create(
    {
      serverId: new UniqueEntityID(),
      oid: [faker.helpers.objectKey(OIDS)],
      ...override,
    },
    id,
  )
  return serverOid
}
