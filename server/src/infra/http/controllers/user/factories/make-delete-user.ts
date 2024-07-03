import { DeleteUserUseCase } from '@/domain/it-manager/application/use-cases/user/delete-user'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const usersRepository = new PrismaUsersRepository(prisma)
const useCase = new DeleteUserUseCase(usersRepository)

export const deleteUserUseCase = useCase
