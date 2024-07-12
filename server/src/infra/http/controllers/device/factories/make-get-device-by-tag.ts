import { GetDeviceByTagUseCase } from "@/domain/it-manager/application/use-cases/device/get-device-by-tag";
import { PrismaDevicesRepository } from "@/infra/database/prisma/repositories/prisma-devices-repository";
import { prisma } from "@/infra/lib/prisma";

const deviceRepository = new PrismaDevicesRepository(prisma)
const usecase = new GetDeviceByTagUseCase(deviceRepository)

export const getDeviceByTagUseCase = usecase