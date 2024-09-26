import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest } from '@/core/errors/bad-request'
import { type Either, failure, success } from '@/core/types/either'
import { FileStorageMethod } from '@/domain/it-manager/enterprise/entities/file-storage-method'
import { BadRequestError } from '@/infra/http/controllers/_errors/bad-request'

import type { FileStorageMethodRepository } from '../../repositories/file-storage-method-repository'

interface CreateFileStorageMethodUseCaseProps {
  userId: string
  method: 'r2' | 'local'
  endpoint: string | null
  accessKeyId: string | null
  secretAccessKey: string | null
  bucket: string | null
  createdAt: Date
  updatedAt?: Date | null
}

type CreateFileStorageMethodUseCaseResponse = Either<BadRequestError, { fileStorageMethod: FileStorageMethod }>

export class CreateFileStorageMethod {
  constructor(private readonly repository: FileStorageMethodRepository) {}

  async execute(props: CreateFileStorageMethodUseCaseProps): Promise<CreateFileStorageMethodUseCaseResponse> {
    const existingFileStorageMethod = await this.repository.findByUser(props.userId)

    if (existingFileStorageMethod) {
      return failure(BadRequest('Cannot have 2 file storage methods for the same user'))
    }

    const method = FileStorageMethod.create({ ...props, userId: new UniqueEntityID(props.userId) })

    await this.repository.create(method)

    return success({ fileStorageMethod: method })
  }
}
