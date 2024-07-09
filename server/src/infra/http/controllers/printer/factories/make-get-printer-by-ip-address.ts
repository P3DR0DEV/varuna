import { GetPrinterByIpAddressUseCase } from '@/domain/it-manager/application/use-cases/printer/get-printer-by-ipaddress'
import { PrismaPrintersRepository } from '@/infra/database/prisma/repositories/prisma-printers-repository'
import { prisma } from '@/infra/lib/prisma'

const printersRepository = new PrismaPrintersRepository(prisma)
const usecase = new GetPrinterByIpAddressUseCase(printersRepository)

export const getPrinterByIpAddressUseCase = usecase
