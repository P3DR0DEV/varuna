import { FetchServicesByIpAddressUseCase } from '@/domain/it-manager/application/use-cases/service/fetch-services-by-ip-address'
import { PrismaComputersRepository } from '@/infra/database/prisma/repositories/prisma-computers-repository'
import { PrismaServicesRepository } from '@/infra/database/prisma/repositories/prisma-services-repository'
import { prisma } from '@/infra/lib/prisma'

const servicesRepository = new PrismaServicesRepository(prisma)
const computersRepository = new PrismaComputersRepository(prisma)

const usecase = new FetchServicesByIpAddressUseCase(servicesRepository, computersRepository)

export const fetchServicesByIpAddressUseCase = usecase
