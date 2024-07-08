import { CreateMobileUseCase } from '@/domain/it-manager/application/use-cases/mobile/create-mobile'
import { PrismaDepartmentsRepository } from '@/infra/database/prisma/repositories/prisma-departments-repository'
import { PrismaMobilesRepository } from '@/infra/database/prisma/repositories/prisma-mobiles-repository'
import { prisma } from '@/infra/lib/prisma'

const mobilesRepository = new PrismaMobilesRepository(prisma)
const departmentsRepository = new PrismaDepartmentsRepository(prisma)

const usecase = new CreateMobileUseCase(mobilesRepository, departmentsRepository)

export const createMobileUseCase = usecase
