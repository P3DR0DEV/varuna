import { EditMobileUseCase } from '@/domain/it-manager/application/use-cases/mobile/edit-mobile'
import { PrismaMobilesRepository } from '@/infra/database/prisma/repositories/prisma-mobiles-repository'
import { prisma } from '@/infra/lib/prisma'

const mobilesRepository = new PrismaMobilesRepository(prisma)
const usecase = new EditMobileUseCase(mobilesRepository)

export const editMobileUseCase = usecase
