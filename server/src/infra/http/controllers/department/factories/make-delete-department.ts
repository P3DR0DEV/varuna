import { DeleteDepartmentUseCase } from '@/domain/it-manager/application/use-cases/department/delete-department'
import { PrismaDepartmentsRepository } from '@/infra/database/prisma/repositories/prisma-departments-repository'
import { prisma } from '@/infra/lib/prisma'

const departmentRepository = new PrismaDepartmentsRepository(prisma)
const usecase = new DeleteDepartmentUseCase(departmentRepository)

export const deleteDepartmentUseCase = usecase
