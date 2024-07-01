import { Printer as PrismaPrinter, PRINTER_OPTIONS, PRINTER_TYPES, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Printer, PrinterTypes, PrintingOptions } from '@/domain/it-manager/enterprise/entities/printer'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

export class PrismaPrintersMapper {
  static toDomain(raw: PrismaPrinter): Printer {
    const id = new UniqueEntityID(raw.id)
    const modelSlug = Slug.createFromText(raw.model)
    const type = MapPrinterType.toDomain(raw.type)
    const printing = MapPrinterOptions.toDomain(raw.printing)

    return Printer.create(
      {
        name: raw.name,
        type,
        serialNumber: raw.serialNumber,
        ipAddress: raw.ipAddress,
        acquisitionDate: raw.acquisitionDate,
        model: raw.model,
        modelSlug,
        printing,
        contractId: raw.contractId ? new UniqueEntityID(raw.contractId) : null,
        endWarrantyDate: raw.endWarrantyDate,
        invoiceNumber: raw.invoiceNumber,
        observations: raw.observations,
      },
      id,
    )
  }

  static toPersistence(printer: Printer): Prisma.PrinterUncheckedCreateInput {
    return {
      id: printer.id.toString(),
      name: printer.name,
      type: MapPrinterType.toPersistence(printer.type),
      serialNumber: printer.serialNumber,
      ipAddress: printer.ipAddress,
      acquisitionDate: printer.acquisitionDate,
      model: printer.model,
      modelSlug: printer.modelSlug,
      printing: MapPrinterOptions.toPersistence(printer.printing),
      contractId: printer.contractId ? printer.contractId.toString() : null,
      endWarrantyDate: printer.endWarrantyDate,
      invoiceNumber: printer.invoiceNumber,
      observations: printer.observations,
    }
  }
}

export class MapPrinterType {
  static toDomain(type: PRINTER_TYPES): PrinterTypes {
    switch (type) {
      case 'LASER':
        return 'laser'
      case 'INKJET':
        return 'inkjet'
      case 'DOTMATRIX':
        return 'dotmatrix'
      case 'THERMAL':
        return 'thermal'
    }
  }

  static toPersistence(type: PrinterTypes): PRINTER_TYPES {
    switch (type) {
      case 'laser':
        return 'LASER'
      case 'inkjet':
        return 'INKJET'
      case 'dotmatrix':
        return 'DOTMATRIX'
      case 'thermal':
        return 'THERMAL'
    }
  }
}

export class MapPrinterOptions {
  static toDomain(options: PRINTER_OPTIONS): PrintingOptions {
    switch (options) {
      case 'COLORFUL':
        return 'colorful'
      case 'MONOCHROME':
        return 'monochrome'
    }
  }

  static toPersistence(options: PrintingOptions): PRINTER_OPTIONS {
    switch (options) {
      case 'colorful':
        return 'COLORFUL'
      case 'monochrome':
        return 'MONOCHROME'
    }
  }
}
