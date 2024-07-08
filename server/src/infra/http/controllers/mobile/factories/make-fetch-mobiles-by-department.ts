import { FetchMobilesByDepartmentUseCase } from '@/domain/it-manager/application/use-cases/mobile/fetch-mobiles-by-department'
import { PrismaDepartmentsRepository } from '@/infra/database/prisma/repositories/prisma-departments-repository'
import { PrismaMobilesRepository } from '@/infra/database/prisma/repositories/prisma-mobiles-repository'
import { prisma } from '@/infra/lib/prisma'

const mobilesRepository = new PrismaMobilesRepository(prisma)
const departmentsRepository = new PrismaDepartmentsRepository(prisma)
const usecase = new FetchMobilesByDepartmentUseCase(mobilesRepository, departmentsRepository)

export const fetchMobilesByDepartmentUseCase = usecase
