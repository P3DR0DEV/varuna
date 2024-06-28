import { PrismaClient } from '@prisma/client'

import { PrinterRepository } from '@/domain/it-manager/application/repositories/printer-repository'
import { Printer, PrinterTypes, PrintingOptions } from '@/domain/it-manager/enterprise/entities/printer'

export class PrismaPrintersRepository implements PrinterRepository {
  constructor(private prisma: PrismaClient) {}

  findById(id: string): Promise<Printer | null> {
    throw new Error('Method not implemented.')
  }

  findByName(name: string): Promise<Printer | null> {
    throw new Error('Method not implemented.')
  }

  findByType(type: PrinterTypes): Promise<Printer[]> {
    throw new Error('Method not implemented.')
  }

  findByIpAddress(ipAddress: string): Promise<Printer | null> {
    throw new Error('Method not implemented.')
  }

  findByPrintingOptions(printing: PrintingOptions): Promise<Printer[]> {
    throw new Error('Method not implemented.')
  }

  findBySerialNumber(serialNumber: string): Promise<Printer | null> {
    throw new Error('Method not implemented.')
  }

  findMany(): Promise<Printer[]> {
    throw new Error('Method not implemented.')
  }

  create(printer: Printer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(printer: Printer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
