import { GetDeviceByIdUseCase } from '@/domain/it-manager/application/use-cases/device/get-device-by-id'
import { PrismaDevicesRepository } from '@/infra/database/prisma/repositories/prisma-devices-repository'
import { prisma } from '@/infra/lib/prisma'

const devicesRepository = new PrismaDevicesRepository(prisma)
const usecase = new GetDeviceByIdUseCase(devicesRepository)

export const getDeviceByIdUseCase = usecase
