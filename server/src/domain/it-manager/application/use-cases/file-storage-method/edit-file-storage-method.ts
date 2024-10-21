import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { FileStorageMethod } from '@/domain/it-manager/enterprise/entities/file-storage-method'

import type { FileStorageMethodRepository } from '../../repositories/file-storage-method-repository'

interface EditFileStorageMethodUseCaseProps {
  id: string
  method: 'r2' | 'local'
  userId: string
  endpoint: string | null
  publicEndpoint: string | null
  accessKeyId: string | null
  secretAccessKey: string | null
  bucket: string | null
}

type EditFileStorageMethodUseCaseResponse = Either<
  NotFoundError | BadRequestError,
  { fileStorageMethod: FileStorageMethod }
>

export class EditFileStorageMethodUseCase {
  constructor(private readonly repository: FileStorageMethodRepository) {}

  async execute(props: EditFileStorageMethodUseCaseProps): Promise<EditFileStorageMethodUseCaseResponse> {
    if (!props.id) {
      return failure(BadRequest('Missing Id'))
    }

    const fileStorageMethod = await this.repository.findById(props.id)

    if (!fileStorageMethod) {
      return failure(NotFound('File storage method not found'))
    }

    fileStorageMethod.method = props.method

    if (props.method === 'local' && (props.endpoint || props.accessKeyId || props.secretAccessKey || props.bucket)) {
      return failure(
        BadRequest('You cannot set endpoint, accessKeyId, secretAccessKey or bucket when using local storage'),
      )
    }

    fileStorageMethod.endpoint = props.endpoint
    fileStorageMethod.accessKeyId = props.accessKeyId
    fileStorageMethod.secretAccessKey = props.secretAccessKey
    fileStorageMethod.bucket = props.bucket
    fileStorageMethod.publicEndpoint = props.publicEndpoint

    await this.repository.save(fileStorageMethod)

    return success({ fileStorageMethod })
  }
}
