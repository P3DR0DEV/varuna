import { GetPrinterBySerialNumberUseCase } from "@/domain/it-manager/application/use-cases/printer/get-printer-by-serial-number";
import { PrismaPrintersRepository } from "@/infra/database/prisma/repositories/prisma-printers-repository";
import { prisma } from "@/infra/lib/prisma";

const printersRepository = new PrismaPrintersRepository(prisma)
const usecase = new GetPrinterBySerialNumberUseCase(printersRepository)

export const getPrinterBySerialNumberUseCase = usecase