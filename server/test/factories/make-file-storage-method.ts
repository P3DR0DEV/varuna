import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  FileStorageMethod,
  type FileStorageMethodProps,
} from '@/domain/it-manager/enterprise/entities/file-storage-method'

export function makeFileStorageMethod(override: Partial<FileStorageMethodProps> = {}, id?: UniqueEntityID) {
  const method = FileStorageMethod.create(
    {
      method: 'r2',
      userId: new UniqueEntityID(),
      endpoint: faker.internet.url(),
      accessKeyId: faker.string.uuid(),
      secretAccessKey: faker.internet.password(),
      bucket: faker.internet.domainName(),
      ...override,
    },
    id,
  )

  return method
}

// export class FileStorageMethodFactory {
//   constructor(private prisma: PrismaClient) {}

//   async createStorageMethod(data: Partial<FileStorageMethodProps> = {}) {
//     const method = makeFileStorageMethod(data)

//     // Mapper.toPersistence(device)
//     await this.prisma.storageMethod.create({ data: method })

//     return method
//   }
// }
