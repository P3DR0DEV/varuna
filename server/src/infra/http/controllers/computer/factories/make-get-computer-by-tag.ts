import { GetComputerByTagUseCase } from "@/domain/it-manager/application/use-cases/computer/get-computer-by-tag";
import { PrismaComputersRepository } from "@/infra/database/prisma/repositories/prisma-computers-repository";
import { prisma } from "@/infra/lib/prisma";

const computerRepository = new PrismaComputersRepository(prisma)
const usecase = new GetComputerByTagUseCase(computerRepository)

export const getComputerByTagUseCase = usecase