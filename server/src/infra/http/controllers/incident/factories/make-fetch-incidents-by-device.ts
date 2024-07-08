import { FetchIncidentsByDeviceIdUseCase } from '@/domain/it-manager/application/use-cases/incident/fetch-incidents-by-device-id'
import { PrismaDevicesRepository } from '@/infra/database/prisma/repositories/prisma-devices-repository'
import { PrismaIncidentsRepository } from '@/infra/database/prisma/repositories/prisma-incidents-repository'
import { prisma } from '@/infra/lib/prisma'

const incidentsRepository = new PrismaIncidentsRepository(prisma)
const devicesRepository = new PrismaDevicesRepository(prisma)

const usecase = new FetchIncidentsByDeviceIdUseCase(incidentsRepository, devicesRepository)

export const fetchIncidentsByDeviceUseCase = usecase
