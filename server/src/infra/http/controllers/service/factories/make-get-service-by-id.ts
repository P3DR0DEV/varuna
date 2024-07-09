import { GetServiceByIdUseCase } from '@/domain/it-manager/application/use-cases/service/get-service-by-id'
import { PrismaServicesRepository } from '@/infra/database/prisma/repositories/prisma-services-repository'
import { prisma } from '@/infra/lib/prisma'

const servicesRepository = new PrismaServicesRepository(prisma)
const usecase = new GetServiceByIdUseCase(servicesRepository)

export const getServiceByIdUseCase = usecase
