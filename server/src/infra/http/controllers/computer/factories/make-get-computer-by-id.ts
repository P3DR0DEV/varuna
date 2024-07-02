import { GetComputerByIdUseCase } from '@/domain/it-manager/application/use-cases/computer/get-computer-by-id'
import { PrismaComputersRepository } from '@/infra/database/prisma/repositories/prisma-computers-repository'
import { prisma } from '@/infra/lib/prisma'

const computersRepository = new PrismaComputersRepository(prisma)
const useCase = new GetComputerByIdUseCase(computersRepository)

export const getComputerByIdUseCase = useCase
