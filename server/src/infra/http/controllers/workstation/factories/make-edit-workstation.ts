import { EditWorkstationUseCase } from '@/domain/it-manager/application/use-cases/workstation/edit-workstation'
import { PrismaComputersRepository } from '@/infra/database/prisma/repositories/prisma-computers-repository'
import { PrismaDepartmentsRepository } from '@/infra/database/prisma/repositories/prisma-departments-repository'
import { PrismaWorkstationRepository } from '@/infra/database/prisma/repositories/prisma-workstation-repository'
import { prisma } from '@/infra/lib/prisma'

const workstationRepository = new PrismaWorkstationRepository(prisma)
const departmentRepository = new PrismaDepartmentsRepository(prisma)
const computersRepository = new PrismaComputersRepository(prisma)

const usecase = new EditWorkstationUseCase(workstationRepository, computersRepository, departmentRepository)

export const editWorkstationUseCase = usecase
