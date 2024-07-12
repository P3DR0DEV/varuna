import { DeleteWorkstationUseCase } from '@/domain/it-manager/application/use-cases/workstation/delete-workstation'
import { PrismaWorkstationRepository } from '@/infra/database/prisma/repositories/prisma-workstation-repository'
import { prisma } from '@/infra/lib/prisma'

const workstationsRepository = new PrismaWorkstationRepository(prisma)
const usecase = new DeleteWorkstationUseCase(workstationsRepository)

export const deleteWorkstationUseCase = usecase