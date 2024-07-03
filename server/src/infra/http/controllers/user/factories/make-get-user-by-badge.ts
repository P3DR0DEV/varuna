import { GetUserByBadgeUseCase } from '@/domain/it-manager/application/use-cases/user/get-user-by-badge'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const usersRepository = new PrismaUsersRepository(prisma)
const useCase = new GetUserByBadgeUseCase(usersRepository)

export const getUserByBadgeUseCase = useCase
