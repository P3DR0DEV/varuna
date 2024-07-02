import { DeleteComputerUseCase } from '@/domain/it-manager/application/use-cases/computer/delete-computer'
import { PrismaComputersRepository } from '@/infra/database/prisma/repositories/prisma-computers-repository'
import { prisma } from '@/infra/lib/prisma'

const computersRepository = new PrismaComputersRepository(prisma)
const usecase = new DeleteComputerUseCase(computersRepository)

export const deleteComputerUseCase = usecase
