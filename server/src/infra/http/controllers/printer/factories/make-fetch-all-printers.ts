import { FetchAllPrintersUseCase } from '@/domain/it-manager/application/use-cases/printer/fetch-all-printers'
import { PrismaPrintersRepository } from '@/infra/database/prisma/repositories/prisma-printers-repository'
import { prisma } from '@/infra/lib/prisma'

const printersRepository = new PrismaPrintersRepository(prisma)
const usecase = new FetchAllPrintersUseCase(printersRepository)

export const fetchAllPrintersUseCase = usecase
