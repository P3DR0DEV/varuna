import { PrismaContractsRepository } from '@/infra/database/prisma/repositories/prisma-contracts-repository'
import { prisma } from '@/infra/lib/prisma'

const contractsRepository = new PrismaContractsRepository(prisma)
const usecase = ``
