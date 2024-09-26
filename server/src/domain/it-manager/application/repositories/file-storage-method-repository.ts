import type { FileStorageMethod } from '../../enterprise/entities/file-storage-method'

export interface FileStorageMethodRepository {
  findByUser(userId: string): Promise<FileStorageMethod | null>
  findById(id: string): Promise<FileStorageMethod | null>

  create(fileStorageMethod: FileStorageMethod): Promise<void>
  save(fileStorageMethod: FileStorageMethod): Promise<void>
}
