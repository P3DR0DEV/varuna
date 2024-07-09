import { GetUserLicenseByIdUseCase } from '@/domain/it-manager/application/use-cases/user-license/get-user-license-by-id'
import { PrismaUserLicenseRepository } from '@/infra/database/prisma/repositories/prisma-user-license-repository'
import { prisma } from '@/infra/lib/prisma'

const userLicensesRepository = new PrismaUserLicenseRepository(prisma)
const usecase = new GetUserLicenseByIdUseCase(userLicensesRepository)

export const getUserLicenseByIdUseCase = usecase
