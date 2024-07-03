import { EditUserUseCase } from '@/domain/it-manager/application/use-cases/user/edit-user'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { prisma } from '@/infra/lib/prisma'

const usersRepository = new PrismaUsersRepository(prisma)
const usecase = new EditUserUseCase(usersRepository)

export const editUserUseCase = usecase
