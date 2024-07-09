import { GetWorkstationByIdUseCase } from '@/domain/it-manager/application/use-cases/workstation/get-workstation-by-id'
import { PrismaWorkstationRepository } from '@/infra/database/prisma/repositories/prisma-workstation-repository'
import { prisma } from '@/infra/lib/prisma'

const workstationsRepository = new PrismaWorkstationRepository(prisma)
const usecase = new GetWorkstationByIdUseCase(workstationsRepository)

export const getWorkstationByIdUseCase = usecase
