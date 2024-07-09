import { DeletePrinterUseCase } from "@/domain/it-manager/application/use-cases/printer/delete-printer";
import { PrismaPrintersRepository } from "@/infra/database/prisma/repositories/prisma-printers-repository";
import { prisma } from "@/infra/lib/prisma";

const printersRepository = new PrismaPrintersRepository(prisma)
const usecase = new DeletePrinterUseCase(printersRepository)

export const deletePrinterUseCase = usecase