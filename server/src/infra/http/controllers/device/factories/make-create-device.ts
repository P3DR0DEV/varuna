import { CreateDeviceUseCase } from '@/domain/it-manager/application/use-cases/device/create-device'
import { PrismaDevicesRepository } from '@/infra/database/prisma/repositories/prisma-devices-repository'
import { prisma } from '@/infra/lib/prisma'

const deviceRepository = new PrismaDevicesRepository(prisma)
const usecase = new CreateDeviceUseCase(deviceRepository)

export const createDeviceUseCase = usecase
