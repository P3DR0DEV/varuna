import { GetDeviceBySerialNumberUseCase } from '@/domain/it-manager/application/use-cases/device/get-device-by-serial-number'
import { PrismaDevicesRepository } from '@/infra/database/prisma/repositories/prisma-devices-repository'
import { prisma } from '@/infra/lib/prisma'

const devicesRepository = new PrismaDevicesRepository(prisma)
const usecase = new GetDeviceBySerialNumberUseCase(devicesRepository)

export const getDeviceBySerialNumberUseCase = usecase
