import type { FileStorageMethod } from '@/domain/it-manager/enterprise/entities/file-storage-method'

export class FileStorageMethodPresenter {
  static toHttp(fileStorageMethod: FileStorageMethod) {
    return {
      id: fileStorageMethod.id,
      bucket: fileStorageMethod.bucket,
      method: fileStorageMethod.method,
      publicEndpoint: fileStorageMethod.publicEndpoint,
    }
  }

  static toDescription(fileStorageMethod: FileStorageMethod) {
    return {
      id: fileStorageMethod.id,
      bucket: fileStorageMethod.bucket,
      method: fileStorageMethod.method,
      publicEndpoint: fileStorageMethod.publicEndpoint,
      accessKeyId: fileStorageMethod.accessKeyId,
      secretAccessKey: fileStorageMethod.secretAccessKey,
      endpoint: fileStorageMethod.endpoint,
      userId: fileStorageMethod.userId,
    }
  }
}
