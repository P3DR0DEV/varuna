import { GetLicenseByNameUseCase } from "@/domain/it-manager/application/use-cases/license/get-license-by-name";
import { PrismaLicensesRepository } from "@/infra/database/prisma/repositories/prisma-licenses-repository";
import { prisma } from "@/infra/lib/prisma";

const licensesRepository = new PrismaLicensesRepository(prisma)
const usecase = new GetLicenseByNameUseCase(licensesRepository)

export const getLicenseByNameUseCase = usecase