import { DeleteIncidentUseCase } from '@/domain/it-manager/application/use-cases/incident/delete-incident'
import { PrismaIncidentsRepository } from '@/infra/database/prisma/repositories/prisma-incidents-repository'
import { prisma } from '@/infra/lib/prisma'

const incidentsRepository = new PrismaIncidentsRepository(prisma)
const usecase = new DeleteIncidentUseCase(incidentsRepository)

export const deleteIncidentUseCase = usecase
