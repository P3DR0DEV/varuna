import { FetchIncidentsByWorkstationUseCase } from '@/domain/it-manager/application/use-cases/incident/fetch-incidents-by-workstation'
import { PrismaIncidentsRepository } from '@/infra/database/prisma/repositories/prisma-incidents-repository'
import { PrismaWorkstationRepository } from '@/infra/database/prisma/repositories/prisma-workstation-repository'
import { prisma } from '@/infra/lib/prisma'

const incidentsRepository = new PrismaIncidentsRepository(prisma)
const workstationRepository = new PrismaWorkstationRepository(prisma)
const usecase = new FetchIncidentsByWorkstationUseCase(incidentsRepository, workstationRepository)

export const fetchIncidentsByWorkstationUseCase = usecase
