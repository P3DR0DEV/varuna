import { GetUserLicenseByLicenseUseCase } from '@/domain/it-manager/application/use-cases/user-license/get-user-license-by-license'
import { PrismaLicensesRepository } from '@/infra/database/prisma/repositories/prisma-licenses-repository'
import { PrismaUserLicenseRepository } from '@/infra/database/prisma/repositories/prisma-user-license-repository'
import { prisma } from '@/infra/lib/prisma'

const userLicenseRepository = new PrismaUserLicenseRepository(prisma)
const licensesRepository = new PrismaLicensesRepository(prisma)

const usecase = new GetUserLicenseByLicenseUseCase(userLicenseRepository, licensesRepository)

export const getUserLicenseByLicenseUseCase = usecase
