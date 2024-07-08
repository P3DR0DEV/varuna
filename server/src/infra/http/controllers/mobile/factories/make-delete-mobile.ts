import { DeleteMobileUseCase } from '@/domain/it-manager/application/use-cases/mobile/delete-mobile'
import { PrismaMobilesRepository } from '@/infra/database/prisma/repositories/prisma-mobiles-repository'
import { prisma } from '@/infra/lib/prisma'

const mobilesRepository = new PrismaMobilesRepository(prisma)
const usecase = new DeleteMobileUseCase(mobilesRepository)

export const deleteMobileUseCase = usecase
