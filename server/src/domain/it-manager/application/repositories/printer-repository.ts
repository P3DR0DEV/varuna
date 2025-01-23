import type { Printer, PrinterTypes, PrintingOptions } from '@/domain/it-manager/enterprise/entities/printer'

export interface PrinterRepository {
  findById(id: string): Promise<Printer | null>
  findByName(name: string): Promise<Printer | null>
  findByIpAddress(ipAddress: string): Promise<Printer | null>
  findBySerialNumber(serialNumber: string): Promise<Printer | null>
  findByTag(tag: string): Promise<Printer | null>
  findMany({ type, option }: { type?: PrinterTypes | null; option?: PrintingOptions | null }): Promise<Printer[]>

  create(printer: Printer): Promise<void>
  save(printer: Printer): Promise<void>
  delete(id: string): Promise<void>
}
