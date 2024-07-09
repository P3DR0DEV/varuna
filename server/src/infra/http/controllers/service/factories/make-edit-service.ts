import { EditServiceUseCase } from '@/domain/it-manager/application/use-cases/service/edit-service'
import { PrismaComputersRepository } from '@/infra/database/prisma/repositories/prisma-computers-repository'
import { PrismaServicesRepository } from '@/infra/database/prisma/repositories/prisma-services-repository'
import { prisma } from '@/infra/lib/prisma'

const servicesRepository = new PrismaServicesRepository(prisma)
const computersRepository = new PrismaComputersRepository(prisma)

const usecase = new EditServiceUseCase(servicesRepository, computersRepository)

export const editServiceUseCase = usecase
