import { FetchAllContractsUseCase } from '@/domain/it-manager/application/use-cases/contract/fetch-all-contracts'
import { PrismaContractsRepository } from '@/infra/database/prisma/repositories/prisma-contracts-repository'
import { prisma } from '@/infra/lib/prisma'

const contractsRepository = new PrismaContractsRepository(prisma)
const usecase = new FetchAllContractsUseCase(contractsRepository)

export const fetchAllContractsUseCase = usecase
