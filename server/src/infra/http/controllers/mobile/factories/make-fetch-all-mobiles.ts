import { FetchAllMobilesUseCase } from '@/domain/it-manager/application/use-cases/mobile/fetch-all-mobiles'
import { PrismaMobilesRepository } from '@/infra/database/prisma/repositories/prisma-mobiles-repository'
import { prisma } from '@/infra/lib/prisma'

const mobilesRepository = new PrismaMobilesRepository(prisma)
const usecase = new FetchAllMobilesUseCase(mobilesRepository)

export const fetchAllMobilesUseCase = usecase
