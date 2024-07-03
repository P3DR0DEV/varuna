import { FetchAllUserUseCase } from '@/domain/it-manager/application/use-cases/user/fetch-all-users'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const usersRepository = new PrismaUsersRepository(prisma)
const useCase = new FetchAllUserUseCase(usersRepository)

export const fetchAllUsersUseCase = useCase
