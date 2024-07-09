import { CreateWorkstationUseCase } from '@/domain/it-manager/application/use-cases/workstation/create-workstation'
import { PrismaComputersRepository } from '@/infra/database/prisma/repositories/prisma-computers-repository'
import { PrismaDepartmentsRepository } from '@/infra/database/prisma/repositories/prisma-departments-repository'
import { PrismaWorkstationRepository } from '@/infra/database/prisma/repositories/prisma-workstation-repository'
import { prisma } from '@/infra/lib/prisma'

const workstationsRepository = new PrismaWorkstationRepository(prisma)
const computersRepository = new PrismaComputersRepository(prisma)
const departmentRepository = new PrismaDepartmentsRepository(prisma)

const usecase = new CreateWorkstationUseCase(workstationsRepository, computersRepository, departmentRepository)

export const createWorkstationUseCase = usecase
