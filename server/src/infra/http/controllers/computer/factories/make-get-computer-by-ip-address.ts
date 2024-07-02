import { GetComputerByIpAddressUseCase } from '@/domain/it-manager/application/use-cases/computer/get-computer-by-ip-address'
import { PrismaComputersRepository } from '@/infra/database/prisma/repositories/prisma-computers-repository'
import { prisma } from '@/infra/lib/prisma'

const computersRepository = new PrismaComputersRepository(prisma)
const useCase = new GetComputerByIpAddressUseCase(computersRepository)

export const getComputerByIpAddressUseCase = useCase
