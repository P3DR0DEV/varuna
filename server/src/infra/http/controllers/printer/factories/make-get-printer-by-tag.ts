import { GetPrinterByTagUseCase } from '@/domain/it-manager/application/use-cases/printer/get-printer-by-tag'
import { PrismaPrintersRepository } from '@/infra/database/prisma/repositories/prisma-printers-repository'
import { prisma } from '@/infra/lib/prisma'

const printerRepository = new PrismaPrintersRepository(prisma)
const usecase = new GetPrinterByTagUseCase(printerRepository)

export const getPrinterByTagUseCase = usecase
