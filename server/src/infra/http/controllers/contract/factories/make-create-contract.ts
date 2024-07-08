import { CreateContractUseCase } from '@/domain/it-manager/application/use-cases/contract/create-contract'
import { PrismaContractsRepository } from '@/infra/database/prisma/repositories/prisma-contracts-repository'
import { prisma } from '@/infra/lib/prisma'

const contractRepository = new PrismaContractsRepository(prisma)
const usecase = new CreateContractUseCase(contractRepository)

export const createContractUseCase = usecase
