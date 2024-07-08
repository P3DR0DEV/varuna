import { GetIncidentByIdUseCase } from '@/domain/it-manager/application/use-cases/incident/get-incident-by-id'
import { PrismaIncidentsRepository } from '@/infra/database/prisma/repositories/prisma-incidents-repository'
import { prisma } from '@/infra/lib/prisma'

const incidentsRepository = new PrismaIncidentsRepository(prisma)
const usecase = new GetIncidentByIdUseCase(incidentsRepository)

export const getIncidentByIdUseCase = usecase
