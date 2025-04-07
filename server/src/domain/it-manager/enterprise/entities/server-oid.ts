import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

interface ServerOIDProps {
  serverId: UniqueEntityID
  oid: Array<string>
  community: string
  createdAt: Date
  updatedAt?: Date | null
}

export class ServerOID extends Entity<ServerOIDProps> {
  get serverId(): UniqueEntityID {
    return this.props.serverId
  }

  set serverId(_serverId: UniqueEntityID) {
    this.props.serverId = _serverId
    this.touch()
  }

  get oid(): Array<string> {
    return this.props.oid
  }

  set oid(_oid: Array<string>) {
    this.props.oid = _oid
    this.touch()
  }

  get community(): string {
    return this.props.community
  }

  set community(_community: string) {
    this.props.community = _community
    this.touch()
  }

  public addOID(oid: string): void {
    this.props.oid.push(oid)
    this.touch()
  }

  public removeOID(oid: string): void {
    this.props.oid = this.props.oid.filter((o) => o !== oid)
    this.touch()
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<ServerOIDProps, 'createdAt' | 'updatedAt' | 'community'>,
    id?: UniqueEntityID,
  ): ServerOID {
    const serverOID = new ServerOID(
      {
        ...props,
        community: props.community ?? 'public',
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    )
    return serverOID
  }
}
