import { GetUserByIdUseCase } from "@/domain/it-manager/application/use-cases/user/get-user-by-id"
import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository"
import { prisma } from "@/infra/lib/prisma"

const usersRepository = new PrismaUsersRepository(prisma)
const useCase = new GetUserByIdUseCase(usersRepository)

export const getUserByIdUseCase = useCase 