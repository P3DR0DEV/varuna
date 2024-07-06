import { GetContractByIdUseCase } from '@/domain/it-manager/application/use-cases/contract/get-contract-by-id'
import { PrismaContractsRepository } from '@/infra/database/prisma/repositories/prisma-contracts-repository'
import { prisma } from '@/infra/lib/prisma'

const contractsRepository = new PrismaContractsRepository(prisma)
const usecase = new GetContractByIdUseCase(contractsRepository)

export const getContractByIdUseCase = usecase
