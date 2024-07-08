import { EditDeviceUseCase } from '@/domain/it-manager/application/use-cases/device/edit-device'
import { PrismaDevicesRepository } from '@/infra/database/prisma/repositories/prisma-devices-repository'
import { prisma } from '@/infra/lib/prisma'

const devicesRepository = new PrismaDevicesRepository(prisma)
const usecase = new EditDeviceUseCase(devicesRepository)

export const editDeviceUseCase = usecase
