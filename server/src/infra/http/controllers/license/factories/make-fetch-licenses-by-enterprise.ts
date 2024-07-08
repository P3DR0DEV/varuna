import { FetchLicensesByEnterpriseUseCase } from '@/domain/it-manager/application/use-cases/license/fetch-licenses-by-enterprise'
import { PrismaLicensesRepository } from '@/infra/database/prisma/repositories/prisma-licenses-repository'
import { prisma } from '@/infra/lib/prisma'

const licensesRepository = new PrismaLicensesRepository(prisma)
const usecase = new FetchLicensesByEnterpriseUseCase(licensesRepository)

export const fetchLicensesByEnterpriseUseCase = usecase
