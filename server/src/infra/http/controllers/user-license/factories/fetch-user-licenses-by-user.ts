import { FetchUserLicenseByUserUseCase } from '@/domain/it-manager/application/use-cases/user-license/fetch-user-license-by-user'
import { PrismaUserLicenseRepository } from '@/infra/database/prisma/repositories/prisma-user-license-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const usersRepository = new PrismaUsersRepository(prisma)
const userLicenseRepository = new PrismaUserLicenseRepository(prisma)

const usecase = new FetchUserLicenseByUserUseCase(userLicenseRepository, usersRepository)

export const fetchUserLicenseByUserUseCase = usecase
