import type { PrismaClient } from '@prisma/client'

import type { FileStorageMethodRepository } from '@/domain/it-manager/application/repositories/file-storage-method-repository'
import type { FileStorageMethod } from '@/domain/it-manager/enterprise/entities/file-storage-method'

import { PrismaFileStorageMethodMapper } from '../mappers/prisma-file-storage-method-mapper'

export class PrismaFileStorageMethodRepository implements FileStorageMethodRepository {
  constructor(private prisma: PrismaClient) {}

  async findByUser(userId: string): Promise<FileStorageMethod | null> {
    const fileStorageMethod = await this.prisma.fileStorageMethod.findUnique({
      where: { userId },
    })

    if (!fileStorageMethod) {
      return null
    }

    return PrismaFileStorageMethodMapper.toDomain(fileStorageMethod)
  }

  async findById(id: string): Promise<FileStorageMethod | null> {
    const fileStorageMethod = await this.prisma.fileStorageMethod.findUnique({
      where: { id },
    })

    if (!fileStorageMethod) {
      return null
    }

    return PrismaFileStorageMethodMapper.toDomain(fileStorageMethod)
  }

  async create(fileStorageMethod: FileStorageMethod): Promise<void> {
    const data = PrismaFileStorageMethodMapper.toPersistence(fileStorageMethod)

    await this.prisma.fileStorageMethod.create({ data })
  }

  async save(fileStorageMethod: FileStorageMethod): Promise<void> {
    const data = PrismaFileStorageMethodMapper.toPersistence(fileStorageMethod)

    await this.prisma.fileStorageMethod.update({
      where: { id: data.id },
      data,
    })
  }
}
