import { UploadFileToStorageUseCase } from '@/domain/it-manager/application/use-cases/file-storage-method/upload-file-to-storage'
import { PrismaFileStorageMethodRepository } from '@/infra/database/prisma/repositories/prisma-file-storage-method-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const repository = new PrismaFileStorageMethodRepository(prisma)
const usersRepository = new PrismaUsersRepository(prisma)
const usecase = new UploadFileToStorageUseCase(repository, usersRepository)

export const createUploadsUseCase = usecase
