import { CreateServiceUseCase } from '@/domain/it-manager/application/use-cases/service/create-service'
import { PrismaComputersRepository } from '@/infra/database/prisma/repositories/prisma-computers-repository'
import { PrismaServicesRepository } from '@/infra/database/prisma/repositories/prisma-services-repository'
import { prisma } from '@/infra/lib/prisma'

const servicesRepository = new PrismaServicesRepository(prisma)
const computersRepository = new PrismaComputersRepository(prisma)

const usecase = new CreateServiceUseCase(servicesRepository, computersRepository)

export const createServiceUseCase = usecase
