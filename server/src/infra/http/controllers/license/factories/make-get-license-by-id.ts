import { GetLicenseByIdUseCase } from '@/domain/it-manager/application/use-cases/license/get-license-by-id'
import { PrismaLicensesRepository } from '@/infra/database/prisma/repositories/prisma-licenses-repository'
import { prisma } from '@/infra/lib/prisma'

const licensesRepository = new PrismaLicensesRepository(prisma)
const usecase = new GetLicenseByIdUseCase(licensesRepository)

export const getLicenseByIdUseCase = usecase
