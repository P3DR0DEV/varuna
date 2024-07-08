import { UpdateIncidentStatusToFixedUseCase } from '@/domain/it-manager/application/use-cases/incident/update-incident-status-to-fixed'
import { PrismaIncidentsRepository } from '@/infra/database/prisma/repositories/prisma-incidents-repository'
import { prisma } from '@/infra/lib/prisma'

const incidentsRepository = new PrismaIncidentsRepository(prisma)
const usecase = new UpdateIncidentStatusToFixedUseCase(incidentsRepository)

export const updateIncidentStatusToFixedUseCase = usecase
