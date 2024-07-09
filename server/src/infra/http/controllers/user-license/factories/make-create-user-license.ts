import { CreateUserLicenseUseCase } from '@/domain/it-manager/application/use-cases/user-license/create-user-license'
import { PrismaDepartmentsRepository } from '@/infra/database/prisma/repositories/prisma-departments-repository'
import { PrismaLicensesRepository } from '@/infra/database/prisma/repositories/prisma-licenses-repository'
import { PrismaUserLicenseRepository } from '@/infra/database/prisma/repositories/prisma-user-license-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const usersRepository = new PrismaUsersRepository(prisma)
const licensesRepository = new PrismaLicensesRepository(prisma)
const userLicenseRepository = new PrismaUserLicenseRepository(prisma)
const departmentsRepository = new PrismaDepartmentsRepository(prisma)

const usecase = new CreateUserLicenseUseCase(
  userLicenseRepository,
  usersRepository,
  licensesRepository,
  departmentsRepository,
)

export const createUserLicenseUseCase = usecase
