import { Printer, PrinterTypes, PrintingOptions } from '@/domain/it-manager/enterprise/entities/printer'

export interface PrinterRepository {
  findById(id: string): Promise<Printer | null>
  findByName(name: string): Promise<Printer | null>
  findByType(type: PrinterTypes): Promise<Printer[]>
  findByIpAddress(ipAddress: string): Promise<Printer | null>
  findByPrintingOptions(printing: PrintingOptions): Promise<Printer[]>
  findBySerialNumber(serialNumber: string): Promise<Printer | null>
  findMany(): Promise<Printer[]>

  create(printer: Printer): Promise<void>
  save(printer: Printer): Promise<void>
  delete(id: string): Promise<void>
}
