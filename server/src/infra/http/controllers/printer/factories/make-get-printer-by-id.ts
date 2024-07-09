import { GetPrinterByIdUseCase } from '@/domain/it-manager/application/use-cases/printer/get-printer-by-id'
import { PrismaPrintersRepository } from '@/infra/database/prisma/repositories/prisma-printers-repository'
import { prisma } from '@/infra/lib/prisma'

const printersRepository = new PrismaPrintersRepository(prisma)
const usecase = new GetPrinterByIdUseCase(printersRepository)

export const getPrintersByIdUseCase = usecase
