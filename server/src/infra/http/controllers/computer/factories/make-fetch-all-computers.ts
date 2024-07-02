import { FetchAllComputersUseCase } from '@/domain/it-manager/application/use-cases/computer/fetch-all-computers'
import { PrismaComputersRepository } from '@/infra/database/prisma/repositories/prisma-computers-repository'
import { prisma } from '@/infra/lib/prisma'

const computersRepository = new PrismaComputersRepository(prisma)
const useCase = new FetchAllComputersUseCase(computersRepository)

export const fetchAllComputersUseCase = useCase
