import { FetchAllWorkstationsUseCase } from '@/domain/it-manager/application/use-cases/workstation/fetch-all-workstations'
import { PrismaWorkstationRepository } from '@/infra/database/prisma/repositories/prisma-workstation-repository'
import { prisma } from '@/infra/lib/prisma'

const workstationsRepository = new PrismaWorkstationRepository(prisma)
const usecase = new FetchAllWorkstationsUseCase(workstationsRepository)

export const fetchAllWorkstationsUseCase = usecase
