import { failure, success, type Either } from '@/core/types/either'

import type { ServerOidRepository } from '../../repositories/server-oid-repository'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import type { ComputerRepository } from '../../repositories/computer-repository'
import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { ServerOID } from '@/domain/it-manager/enterprise/entities/server-oid'

interface CreateServerOidProps {
  serverId: string
  oid: Array<string>
}

type CreateServerOidResponse = Either<NotFoundError | BadRequestError, { serverOID: ServerOID }>

export class CreateServerOidUseCase {
  constructor(
    private serverOidRepository: ServerOidRepository,
    private computerRepository: ComputerRepository,
  ) {}

  async execute(props: CreateServerOidProps): Promise<CreateServerOidResponse> {
    const computer = await this.computerRepository.findById(props.serverId)

    if (!computer) {
      return failure(NotFound('computer not found'))
    }

    if (computer.type !== 'server') {
      return failure(BadRequest('computer is not a server'))
    }

    const serverOid = await this.serverOidRepository.findByServer(props.serverId)

    if (serverOid) {
      return failure(BadRequest('There are already oids for this server'))
    }

    const serverOID = ServerOID.create({
      oid: props.oid,
      serverId: computer.id,
    })

    await this.serverOidRepository.create(serverOID)

    return success({ serverOID })
  }
}
