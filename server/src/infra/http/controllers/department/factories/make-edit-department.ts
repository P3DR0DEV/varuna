import { EditDepartmentUseCase } from '@/domain/it-manager/application/use-cases/department/edit-department'
import { PrismaDepartmentsRepository } from '@/infra/database/prisma/repositories/prisma-departments-repository'
import { prisma } from '@/infra/lib/prisma'

const departmentsRepository = new PrismaDepartmentsRepository(prisma)
const usecase = new EditDepartmentUseCase(departmentsRepository)

export const editDepartmentUseCase = usecase
