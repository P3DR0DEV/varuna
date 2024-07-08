import { FetchAllDevicesUseCase } from '@/domain/it-manager/application/use-cases/device/fetch-all-devices'
import { PrismaDevicesRepository } from '@/infra/database/prisma/repositories/prisma-devices-repository'
import { prisma } from '@/infra/lib/prisma'

const devicesRepository = new PrismaDevicesRepository(prisma)
const usecase = new FetchAllDevicesUseCase(devicesRepository)

export const fetchAllDevicesUseCase = usecase
