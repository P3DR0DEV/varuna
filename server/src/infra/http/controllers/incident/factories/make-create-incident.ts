import { CreateIncidentUseCase } from '@/domain/it-manager/application/use-cases/incident/create-incident'
import { PrismaDevicesRepository } from '@/infra/database/prisma/repositories/prisma-devices-repository'
import { PrismaIncidentsRepository } from '@/infra/database/prisma/repositories/prisma-incidents-repository'
import { PrismaWorkstationRepository } from '@/infra/database/prisma/repositories/prisma-workstation-repository'
import { prisma } from '@/infra/lib/prisma'

const incidentsRepository = new PrismaIncidentsRepository(prisma)
const deviceRepository = new PrismaDevicesRepository(prisma)
const workstationRepository = new PrismaWorkstationRepository(prisma)

const usecase = new CreateIncidentUseCase(incidentsRepository, deviceRepository, workstationRepository)

export const createIncidentUseCase = usecase
