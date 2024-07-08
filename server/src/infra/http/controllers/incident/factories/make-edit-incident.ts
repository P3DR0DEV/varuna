import { EditIncidentUseCase } from '@/domain/it-manager/application/use-cases/incident/edit-incident'
import { PrismaIncidentsRepository } from '@/infra/database/prisma/repositories/prisma-incidents-repository'
import { prisma } from '@/infra/lib/prisma'

const incidentsRepository = new PrismaIncidentsRepository(prisma)
const usecase = new EditIncidentUseCase(incidentsRepository)

export const editIncidentUseCase = usecase
