import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { FileStorageMethod } from '@/domain/it-manager/enterprise/entities/file-storage-method'

import type { FileStorageMethodRepository } from '../../repositories/file-storage-method-repository'

interface FindFileStorageMethodByUserUseCaseProps {
  userId: string
}

type FindFileStorageMethodByUserUseCaseResponse = Either<
  NotFoundError | BadRequestError,
  { fileStorageMethod: FileStorageMethod }
>

export class FindFileStorageMethodByUserUseCase {
  constructor(private readonly repository: FileStorageMethodRepository) {}

  async execute({
    userId,
  }: FindFileStorageMethodByUserUseCaseProps): Promise<FindFileStorageMethodByUserUseCaseResponse> {
    if (!userId) {
      return failure(BadRequest('Missing parameters'))
    }

    const fileStorageMethod = await this.repository.findByUser(userId)

    if (!fileStorageMethod) {
      return failure(NotFound('File storage method not found'))
    }

    return success({ fileStorageMethod })
  }
}
