import { FetchAllUsersByDepartmentUseCase } from '@/domain/it-manager/application/use-cases/user/fetch-all-users-by-department'
import { PrismaDepartmentsRepository } from '@/infra/database/prisma/repositories/prisma-departments-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const usersRepository = new PrismaUsersRepository(prisma)
const departmentRepository = new PrismaDepartmentsRepository(prisma)
const useCase = new FetchAllUsersByDepartmentUseCase(usersRepository, departmentRepository)

export const fetchAllUsersByDepartment = useCase
