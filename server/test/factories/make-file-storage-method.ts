import { faker } from '@faker-js/faker'
import type { PrismaClient } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  FileStorageMethod,
  type FileStorageMethodProps,
} from '@/domain/it-manager/enterprise/entities/file-storage-method'
import { PrismaFileStorageMethodMapper } from '@/infra/database/prisma/mappers/prisma-file-storage-method-mapper'

export function makeFileStorageMethod(override: Partial<FileStorageMethodProps> = {}, id?: UniqueEntityID) {
  const method = FileStorageMethod.create(
    {
      method: 'r2',
      userId: new UniqueEntityID(),
      endpoint: faker.internet.url(),
      accessKeyId: faker.string.uuid(),
      secretAccessKey: faker.internet.password(),
      bucket: faker.internet.domainName(),
      publicEndpoint: faker.internet.url(),
      ...override,
    },
    id,
  )

  return method
}

export class FileStorageMethodFactory {
  constructor(private prisma: PrismaClient) {}

  async createStorageMethod(data: Partial<FileStorageMethodProps> = {}) {
    const method = makeFileStorageMethod(data)

    // Mapper.toPersistence(device)
    await this.prisma.fileStorageMethod.create({ data: PrismaFileStorageMethodMapper.toPersistence(method) })

    return method
  }
}
