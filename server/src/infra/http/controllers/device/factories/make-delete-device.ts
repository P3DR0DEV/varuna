import { DeleteDeviceUseCase } from '@/domain/it-manager/application/use-cases/device/delete-device'
import { PrismaDevicesRepository } from '@/infra/database/prisma/repositories/prisma-devices-repository'
import { prisma } from '@/infra/lib/prisma'

const devicesRepository = new PrismaDevicesRepository(prisma)
const usecase = new DeleteDeviceUseCase(devicesRepository)

export const deleteDeviceUseCase = usecase
