import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import { FileStorageMethod } from '@/domain/it-manager/enterprise/entities/file-storage-method'

import type { FileStorageMethodRepository } from '../../repositories/file-storage-method-repository'
import type { UsersRepository } from '../../repositories/users-repository'

interface CreateFileStorageMethodUseCaseProps {
  userId: string
  method: 'r2' | 'local'
  endpoint: string | null
  accessKeyId: string | null
  secretAccessKey: string | null
  bucket: string | null
}

type CreateFileStorageMethodUseCaseResponse = Either<
  BadRequestError | NotFoundError,
  { fileStorageMethod: FileStorageMethod }
>

export class CreateFileStorageMethodUseCase {
  constructor(
    private readonly repository: FileStorageMethodRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(props: CreateFileStorageMethodUseCaseProps): Promise<CreateFileStorageMethodUseCaseResponse> {
    const user = await this.usersRepository.findById(props.userId)

    if (!user) {
      return failure(NotFound('User not found'))
    }

    const existingFileStorageMethod = await this.repository.findByUser(props.userId)

    if (existingFileStorageMethod) {
      return failure(BadRequest('Cannot have 2 file storage methods for the same user'))
    }

    const method = FileStorageMethod.create({ ...props, userId: new UniqueEntityID(props.userId) })

    await this.repository.create(method)

    return success({ fileStorageMethod: method })
  }
}
