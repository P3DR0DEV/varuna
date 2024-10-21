import type { FileStorageMethodRepository } from '@/domain/it-manager/application/repositories/file-storage-method-repository'
import type { FileStorageMethod } from '@/domain/it-manager/enterprise/entities/file-storage-method'

export class InMemoryFileStorageMethodRepository implements FileStorageMethodRepository {
  private readonly fileStorageMethods: FileStorageMethod[] = []

  async findByUser(userId: string): Promise<FileStorageMethod | null> {
    const method = this.fileStorageMethods.find((fileStorageMethod) => fileStorageMethod.userId === userId)

    if (!method) {
      return null
    }
    return method
  }

  async findById(id: string): Promise<FileStorageMethod | null> {
    const method = this.fileStorageMethods.find((fileStorageMethod) => fileStorageMethod.id.toString() === id)

    if (!method) {
      return null
    }
    return method
  }

  async create(fileStorageMethod: FileStorageMethod): Promise<void> {
    this.fileStorageMethods.push(fileStorageMethod)
  }

  async save(fileStorageMethod: FileStorageMethod): Promise<void> {
    const index = this.fileStorageMethods.findIndex((method) => method.id === fileStorageMethod.id)

    this.fileStorageMethods[index] = fileStorageMethod
  }
}
