import { GetDepartmentByIdUseCase } from '@/domain/it-manager/application/use-cases/department/get-department-by-id'
import { PrismaDepartmentsRepository } from '@/infra/database/prisma/repositories/prisma-departments-repository'
import { prisma } from '@/infra/lib/prisma'

const departmentsRepository = new PrismaDepartmentsRepository(prisma)
const usecase = new GetDepartmentByIdUseCase(departmentsRepository)

export const getDepartmentByIdUseCase = usecase