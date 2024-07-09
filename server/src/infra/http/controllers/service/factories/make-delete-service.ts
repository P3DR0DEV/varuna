import { DeleteServiceUseCase } from '@/domain/it-manager/application/use-cases/service/delete-service'
import { PrismaServicesRepository } from '@/infra/database/prisma/repositories/prisma-services-repository'
import { prisma } from '@/infra/lib/prisma'

const servicesRepository = new PrismaServicesRepository(prisma)
const usecase = new DeleteServiceUseCase(servicesRepository)

export const deleteServiceUseCase = usecase
