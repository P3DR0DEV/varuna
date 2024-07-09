import { GetWorkstationByComputerId } from '@/domain/it-manager/application/use-cases/workstation/get-workstation-by-computer-id'
import { PrismaWorkstationRepository } from '@/infra/database/prisma/repositories/prisma-workstation-repository'
import { prisma } from '@/infra/lib/prisma'

const workstationsRepository = new PrismaWorkstationRepository(prisma)
const usecase = new GetWorkstationByComputerId(workstationsRepository)

export const getWorkstationByComputerIdUseCase = usecase
