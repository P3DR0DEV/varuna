import { AddChiefToDepartmentUseCase } from '@/domain/it-manager/application/use-cases/department/add-chief-to-department'
import { PrismaDepartmentsRepository } from '@/infra/database/prisma/repositories/prisma-departments-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const departmentsRepository = new PrismaDepartmentsRepository(prisma)
const usersRepository = new PrismaUsersRepository(prisma)
const usecase = new AddChiefToDepartmentUseCase(departmentsRepository, usersRepository)

export const addChiefToDepartmentUseCase = usecase
