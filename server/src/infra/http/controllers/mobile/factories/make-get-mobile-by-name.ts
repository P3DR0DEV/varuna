import { GetMobileByNameUseCase } from '@/domain/it-manager/application/use-cases/mobile/get-mobile-by-name'
import { PrismaMobilesRepository } from '@/infra/database/prisma/repositories/prisma-mobiles-repository'
import { prisma } from '@/infra/lib/prisma'

const mobilesRepository = new PrismaMobilesRepository(prisma)
const usecase = new GetMobileByNameUseCase(mobilesRepository)

export const getMobileByNameUseCase = usecase
