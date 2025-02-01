import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import { errors } from '@/infra/http/controllers/_errors'

import type { FileStorageMethodRepository } from '../../repositories/file-storage-method-repository'
import type { UsersRepository } from '../../repositories/users-repository'
import { UploadFileUseCase } from '../uploads/file-storage'
import type { BadRequestError } from '@/core/errors/bad-request'

interface UploadFileToStorageUseCaseProps {
  userId: string
  file: File
}

type UploadFileToStorageUseCaseResponse = Either<NotFoundError | BadRequestError | Error, string>

export class UploadFileToStorageUseCase {
  constructor(
    private readonly repository: FileStorageMethodRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ userId, file }: UploadFileToStorageUseCaseProps): Promise<UploadFileToStorageUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(NotFound('User not found'))
    }

    const fileStorageMethod = await this.repository.findByUser(userId)

    if (!fileStorageMethod) {
      return failure(NotFound('File storage method not found'))
    }

    // TODO: upload file to storage

    const { accessKeyId, secretAccessKey, endpoint, bucket, method } = fileStorageMethod

    if (method === 'r2') {
      const response = await UploadFileUseCase.uploadR2File({
        accessKeyId: accessKeyId as string,
        secretAccessKey: secretAccessKey as string,
        endpoint: endpoint as string,
        bucket: bucket as string,
        file,
        name: user.name,
      })

      if (response.isFailure()) {
        const { message, name } = response.reason
        throw new errors[name](message)
      }

      return success(response.value)
    }

    const response = await UploadFileUseCase.uploadLocalFile(file, user.name)

    if (response.isFailure()) {
      throw new Error('Failed to upload file')
    }

    return success(response.value)
  }
}
