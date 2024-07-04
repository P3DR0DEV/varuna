import { CreateDepartmentUseCase } from '@/domain/it-manager/application/use-cases/department/create-department'
import { PrismaDepartmentsRepository } from '@/infra/database/prisma/repositories/prisma-departments-repository'
import { prisma } from '@/infra/lib/prisma'

const departmentRepository = new PrismaDepartmentsRepository(prisma)
const useCase = new CreateDepartmentUseCase(departmentRepository)

export const createDepartmentUseCase = useCase
