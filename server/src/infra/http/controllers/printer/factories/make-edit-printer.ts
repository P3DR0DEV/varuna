import { EditPrinterUseCase } from "@/domain/it-manager/application/use-cases/printer/edit-printer";
import { PrismaPrintersRepository } from "@/infra/database/prisma/repositories/prisma-printers-repository";
import { prisma } from "@/infra/lib/prisma";

const printersRepository = new PrismaPrintersRepository(prisma)
const usecase = new EditPrinterUseCase(printersRepository)

export const editPrinterUseCase = usecase