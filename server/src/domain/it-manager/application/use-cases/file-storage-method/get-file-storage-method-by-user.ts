import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { FileStorageMethod } from '@/domain/it-manager/enterprise/entities/file-storage-method'

import type { FileStorageMethodRepository } from '../../repositories/file-storage-method-repository'
import type { UsersRepository } from '../../repositories/users-repository'

interface GetFileStorageMethodByUserUseCaseProps {
  userId: string
}

type GetFileStorageMethodByUserUseCaseResponse = Either<
  NotFoundError | BadRequestError,
  { fileStorageMethod: FileStorageMethod }
>

export class GetFileStorageMethodByUserUseCase {
  constructor(
    private readonly repository: FileStorageMethodRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: GetFileStorageMethodByUserUseCaseProps): Promise<GetFileStorageMethodByUserUseCaseResponse> {
    if (!userId) {
      return failure(BadRequest('Missing parameters'))
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(NotFound('User not found'))
    }

    const fileStorageMethod = await this.repository.findByUser(userId)

    if (!fileStorageMethod) {
      return failure(NotFound('File storage method not found'))
    }

    return success({ fileStorageMethod })
  }
}
