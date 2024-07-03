import { CreateUserUseCase } from '@/domain/it-manager/application/use-cases/user/create-user'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const usersRepository = new PrismaUsersRepository(prisma)
const useCase = new CreateUserUseCase(usersRepository)

export const createUserUseCase = useCase
