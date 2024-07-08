import { CreateLicenseUseCase } from "@/domain/it-manager/application/use-cases/license/create-license";
import { PrismaLicensesRepository } from "@/infra/database/prisma/repositories/prisma-licenses-repository";
import { prisma } from "@/infra/lib/prisma";

const licensesRepository = new PrismaLicensesRepository(prisma)
const usecase = new CreateLicenseUseCase(licensesRepository)

export const createLicenseUseCase = usecase