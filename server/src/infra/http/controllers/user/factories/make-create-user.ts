import { CreateUserUseCase } from '@/domain/it-manager/application/use-cases/user/create-user'
import { PrismaDepartmentsRepository } from '@/infra/database/prisma/repositories/prisma-departments-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { PrismaWorkstationRepository } from '@/infra/database/prisma/repositories/prisma-workstation-repository'
import { prisma } from '@/infra/lib/prisma'

const usersRepository = new PrismaUsersRepository(prisma)
const workstationRepository = new PrismaWorkstationRepository(prisma)
const departmentsRepository = new PrismaDepartmentsRepository(prisma)

const useCase = new CreateUserUseCase(usersRepository, workstationRepository, departmentsRepository)

export const createUserUseCase = useCase
