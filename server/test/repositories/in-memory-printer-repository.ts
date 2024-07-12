import { PrinterRepository } from '@/domain/it-manager/application/repositories/printer-repository'
import { Printer, PrinterTypes, PrintingOptions } from '@/domain/it-manager/enterprise/entities/printer'

export class InMemoryPrinterRepository implements PrinterRepository {
  public items: Printer[] = []

  async findBySerialNumber(serialNumber: string): Promise<Printer | null> {
    const printer = this.items.find((item) => item.serialNumber === serialNumber)

    if (!printer) {
      return null
    }
    return printer
  }

  async findByTag(tag: string): Promise<Printer | null> {
    const printer = this.items.find((item) => item.tag === tag)

    if (!printer) {
      return null
    }

    return printer
  }

  async findById(id: string): Promise<Printer | null> {
    const printer = this.items.find((item) => item.id.toString() === id)
    if (!printer) {
      return null
    }
    return printer
  }

  async findByName(name: string): Promise<Printer | null> {
    const printer = this.items.find((item) => item.name === name)
    if (!printer) {
      return null
    }
    return printer
  }

  async findByType(type: PrinterTypes): Promise<Printer[]> {
    const printers = this.items.filter((item) => item.type === type)

    return printers
  }

  async findByIpAddress(ipAddress: string): Promise<Printer | null> {
    const printer = this.items.find((item) => item.ipAddress === ipAddress)
    if (!printer) {
      return null
    }
    return printer
  }

  async findByPrintingOptions(printing: PrintingOptions): Promise<Printer[]> {
    const printers = this.items.filter((item) => item.printing === printing)

    return printers
  }

  async findMany(): Promise<Printer[]> {
    return this.items
  }

  async create(printer: Printer): Promise<void> {
    this.items.push(printer)
  }

  async save(printer: Printer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === printer.id)

    this.items[itemIndex] = printer
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(index, 1)
  }
}
