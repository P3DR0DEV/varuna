import { FetchAllServicesUseCase } from '@/domain/it-manager/application/use-cases/service/fetch-all-services'
import { PrismaServicesRepository } from '@/infra/database/prisma/repositories/prisma-services-repository'
import { prisma } from '@/infra/lib/prisma'

const servicesRepository = new PrismaServicesRepository(prisma)
const usecase = new FetchAllServicesUseCase(servicesRepository)

export const fetchAllServicesUseCase = usecase
