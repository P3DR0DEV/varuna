import { CreatePrinterUseCase } from '@/domain/it-manager/application/use-cases/printer/create-printer'
import { PrismaPrintersRepository } from '@/infra/database/prisma/repositories/prisma-printers-repository'
import { prisma } from '@/infra/lib/prisma'

const printersRepository = new PrismaPrintersRepository(prisma)
const usecase = new CreatePrinterUseCase(printersRepository)

export const createPrinterUseCase = usecase
