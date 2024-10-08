import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

export type fileStorageMethod = 'r2' | 'local'

export interface FileStorageMethodProps {
  userId: UniqueEntityID
  method: fileStorageMethod
  endpoint: string | null
  publicEndpoint: string | null
  accessKeyId: string | null
  secretAccessKey: string | null
  bucket: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export class FileStorageMethod extends Entity<FileStorageMethodProps> {
  get method(): 'r2' | 'local' {
    return this.props.method
  }

  set method(method: 'r2' | 'local') {
    this.props.method = method
    this.touch()
  }

  get publicEndpoint(): string | null {
    return this.props.publicEndpoint
  }

  set publicEndpoint(publicEndpoint: string | null) {
    this.props.publicEndpoint = publicEndpoint
    this.touch()
  }

  get endpoint(): string | null {
    return this.props.endpoint
  }

  set endpoint(endpoint: string | null) {
    this.props.endpoint = endpoint
    this.touch()
  }

  get accessKeyId(): string | null {
    return this.props.accessKeyId
  }

  set accessKeyId(accessKeyId: string | null) {
    this.props.accessKeyId = accessKeyId
    this.touch()
  }

  get secretAccessKey(): string | null {
    return this.props.secretAccessKey
  }

  set secretAccessKey(secretAccessKey: string | null) {
    this.props.secretAccessKey = secretAccessKey
    this.touch()
  }

  get bucket(): string | null {
    return this.props.bucket
  }

  set bucket(bucket: string | null) {
    this.props.bucket = bucket
    this.touch()
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  get userId(): string {
    return this.props.userId.toString()
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<FileStorageMethodProps, 'createdAt'>, id?: UniqueEntityID) {
    // set r2 props to null
    if (props.method === 'local') {
      const method = new FileStorageMethod(
        {
          method: props.method,
          userId: props.userId,
          createdAt: props.createdAt ?? new Date(),
          endpoint: null,
          accessKeyId: null,
          secretAccessKey: null,
          bucket: null,
          publicEndpoint: null,
        },
        id,
      )
      return method
    }

    const method = new FileStorageMethod(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return method
  }
}
