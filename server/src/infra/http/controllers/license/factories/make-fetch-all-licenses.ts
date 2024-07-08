import { FetchAllLicensesUseCase } from '@/domain/it-manager/application/use-cases/license/fetch-all-licenses'
import { PrismaLicensesRepository } from '@/infra/database/prisma/repositories/prisma-licenses-repository'
import { prisma } from '@/infra/lib/prisma'

const licensesRepository = new PrismaLicensesRepository(prisma)
const usecase = new FetchAllLicensesUseCase(licensesRepository)

export const fetchAllLicensesUseCase = usecase
