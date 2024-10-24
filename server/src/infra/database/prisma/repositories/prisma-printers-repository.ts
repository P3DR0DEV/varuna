import { PrismaClient } from '@prisma/client'

import { PrinterRepository } from '@/domain/it-manager/application/repositories/printer-repository'
import { Printer, PrinterTypes, PrintingOptions } from '@/domain/it-manager/enterprise/entities/printer'

import { MapPrinterOptions, MapPrinterType, PrismaPrintersMapper } from '../mappers/prisma-printers-mapper'

export class PrismaPrintersRepository implements PrinterRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Printer | null> {
    const printer = await this.prisma.printer.findUnique({ where: { id } })

    if (!printer) {
      return null
    }

    return PrismaPrintersMapper.toDomain(printer)
  }

  async findByTag(tag: string): Promise<Printer | null> {
    const printer = await this.prisma.printer.findUnique({ where: { tag } })

    if (!printer) {
      return null
    }

    return PrismaPrintersMapper.toDomain(printer)
  }

  async findByName(name: string): Promise<Printer | null> {
    const printer = await this.prisma.printer.findUnique({ where: { name } })

    if (!printer) {
      return null
    }

    return PrismaPrintersMapper.toDomain(printer)
  }

  async findByIpAddress(ipAddress: string): Promise<Printer | null> {
    const printer = await this.prisma.printer.findUnique({
      where: { ipAddress },
    })

    if (!printer) {
      return null
    }

    return PrismaPrintersMapper.toDomain(printer)
  }

  async findBySerialNumber(serialNumber: string): Promise<Printer | null> {
    const printer = await this.prisma.printer.findUnique({
      where: { serialNumber },
    })

    if (!printer) {
      return null
    }

    return PrismaPrintersMapper.toDomain(printer)
  }

  async findMany({ type, options }: { type?: PrinterTypes; options?: PrintingOptions }): Promise<Printer[]> {
    const printers = await this.prisma.printer.findMany({
      where: {
        type: type ? MapPrinterType.toPersistence(type) : undefined,
        printing: options ? MapPrinterOptions.toPersistence(options) : undefined,
      },
    })

    return printers.map(PrismaPrintersMapper.toDomain)
  }

  async create(printer: Printer): Promise<void> {
    const data = PrismaPrintersMapper.toPersistence(printer)

    await this.prisma.printer.create({ data })
  }

  async save(printer: Printer): Promise<void> {
    const data = PrismaPrintersMapper.toPersistence(printer)

    await this.prisma.printer.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.printer.delete({ where: { id } })
  }
}
