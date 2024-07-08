import { EditContractUseCase } from '@/domain/it-manager/application/use-cases/contract/edit-contract'
import { PrismaContractsRepository } from '@/infra/database/prisma/repositories/prisma-contracts-repository'
import { prisma } from '@/infra/lib/prisma'

const contractsRepository = new PrismaContractsRepository(prisma)
const usecase = new EditContractUseCase(contractsRepository)

export const editContractUseCase = usecase
