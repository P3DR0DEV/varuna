import { DeleteUserLicenseUseCase } from '@/domain/it-manager/application/use-cases/user-license/delete-user-license'
import { PrismaUserLicenseRepository } from '@/infra/database/prisma/repositories/prisma-user-license-repository'
import { prisma } from '@/infra/lib/prisma'

const userLicenseRepository = new PrismaUserLicenseRepository(prisma)
const usecase = new DeleteUserLicenseUseCase(userLicenseRepository)

export const deleteUserLicenseUseCase = usecase
