import { GetPrinterByNameUseCase } from '@/domain/it-manager/application/use-cases/printer/get-printer-by-name'
import { PrismaPrintersRepository } from '@/infra/database/prisma/repositories/prisma-printers-repository'
import { prisma } from '@/infra/lib/prisma'

const printersRepository = new PrismaPrintersRepository(prisma)
const usecase = new GetPrinterByNameUseCase(printersRepository)

export const getPrinterByNameUseCase = usecase
