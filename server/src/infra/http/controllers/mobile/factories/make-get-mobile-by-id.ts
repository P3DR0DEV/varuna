import { GetMobileByIdUseCase } from '@/domain/it-manager/application/use-cases/mobile/get-mobile-by-id'
import { PrismaMobilesRepository } from '@/infra/database/prisma/repositories/prisma-mobiles-repository'
import { prisma } from '@/infra/lib/prisma'

const mobilesRepository = new PrismaMobilesRepository(prisma)
const usecase = new GetMobileByIdUseCase(mobilesRepository)

export const getMobileByIdUseCase = usecase
