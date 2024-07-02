import { EditComputerUseCase } from '@/domain/it-manager/application/use-cases/computer/edit-computer'
import { PrismaComputersRepository } from '@/infra/database/prisma/repositories/prisma-computers-repository'
import { prisma } from '@/infra/lib/prisma'

const computersRepository = new PrismaComputersRepository(prisma)
const usecase = new EditComputerUseCase(computersRepository)

export const editComputerUseCase = usecase
