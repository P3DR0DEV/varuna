import { EditContractStatusUseCase } from '@/domain/it-manager/application/use-cases/contract/edit-contract-status'
import { PrismaContractsRepository } from '@/infra/database/prisma/repositories/prisma-contracts-repository'
import { prisma } from '@/infra/lib/prisma'

const contractsRepository = new PrismaContractsRepository(prisma)
const usecase = new EditContractStatusUseCase(contractsRepository)

export const editContractStatusUseCase = usecase
