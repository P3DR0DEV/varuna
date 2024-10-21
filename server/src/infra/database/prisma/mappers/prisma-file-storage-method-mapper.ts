import type { FILE_STORAGE_METHODS, FileStorageMethod as PrismaFileStorageMethod, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FileStorageMethod, type fileStorageMethod } from '@/domain/it-manager/enterprise/entities/file-storage-method'

export class PrismaFileStorageMethodMapper {
  static toPersistence(raw: FileStorageMethod): Prisma.FileStorageMethodUncheckedCreateInput {
    const method = MapMethods.toPersistence(raw.method)

    return {
      method,
      userId: raw.userId.toString(),
      endpoint: raw.endpoint,
      accessKeyId: raw.accessKeyId,
      secretAccessKey: raw.secretAccessKey,
      bucket: raw.bucket,
    }
  }

  static toDomain(fileStorageMethod: PrismaFileStorageMethod): FileStorageMethod {
    const method = MapMethods.toDomain(fileStorageMethod.method)

    return FileStorageMethod.create(
      {
        method,
        userId: new UniqueEntityID(fileStorageMethod.userId),
        endpoint: fileStorageMethod.endpoint,
        accessKeyId: fileStorageMethod.accessKeyId,
        secretAccessKey: fileStorageMethod.secretAccessKey,
        bucket: fileStorageMethod.bucket,
      },
      new UniqueEntityID(fileStorageMethod.id),
    )
  }
}

class MapMethods {
  static toPersistence(method: fileStorageMethod) {
    switch (method) {
      case 'r2':
        return 'R2'
      case 'local':
        return 'LOCAL'
    }
  }

  static toDomain(method: FILE_STORAGE_METHODS) {
    switch (method) {
      case 'R2':
        return 'r2'
      case 'LOCAL':
        return 'local'
    }
  }
}
