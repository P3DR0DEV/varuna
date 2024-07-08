import { EditLicenseUseCase } from '@/domain/it-manager/application/use-cases/license/edit-license'
import { PrismaLicensesRepository } from '@/infra/database/prisma/repositories/prisma-licenses-repository'
import { prisma } from '@/infra/lib/prisma'

const licensesRepository = new PrismaLicensesRepository(prisma)
const usecase = new EditLicenseUseCase(licensesRepository)

export const editLicenseUseCase = usecase
