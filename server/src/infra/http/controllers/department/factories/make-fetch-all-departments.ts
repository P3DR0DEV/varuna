import { FetchAllDepartmentsUseCase } from '@/domain/it-manager/application/use-cases/department/fetch-all-departments'
import { PrismaDepartmentsRepository } from '@/infra/database/prisma/repositories/prisma-departments-repository'
import { prisma } from '@/infra/lib/prisma'

const departmentsRepository = new PrismaDepartmentsRepository(prisma)
const usecase = new FetchAllDepartmentsUseCase(departmentsRepository)

export const fetchAllDepartmentsUseCase = usecase
