import { GetComputerByHostNameUseCase } from '@/domain/it-manager/application/use-cases/computer/get-computer-by-hostname'
import { PrismaComputersRepository } from '@/infra/database/prisma/repositories/prisma-computers-repository'
import { prisma } from '@/infra/lib/prisma'

const computersRepository = new PrismaComputersRepository(prisma)
const useCase = new GetComputerByHostNameUseCase(computersRepository)

export const getComputerByHostnameUseCase = useCase
