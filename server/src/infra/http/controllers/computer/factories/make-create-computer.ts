import { CreateComputerUseCase } from '@/domain/it-manager/application/use-cases/computer/create-computer'
import { PrismaComputersRepository } from '@/infra/database/prisma/repositories/prisma-computers-repository'
import { prisma } from '@/infra/lib/prisma'

const computerRepository = new PrismaComputersRepository(prisma)
const usecase = new CreateComputerUseCase(computerRepository)

export const createComputerUseCase = usecase
