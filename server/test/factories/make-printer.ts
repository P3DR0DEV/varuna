import { faker } from '@faker-js/faker'
import type { PrismaClient } from '@prisma/client'

import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Printer, type PrinterProps } from '@/domain/it-manager/enterprise/entities/printer'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'
import { PrismaPrintersMapper } from '@/infra/database/prisma/mappers/prisma-printers-mapper'

export function makePrinter(override: Partial<PrinterProps> = {}, id?: UniqueEntityID) {
  const device = {
    serialNumber: faker.number.int().toString(),
    model: faker.commerce.productName(),
    acquisitionDate: faker.date.past({ years: 1 }),
    endWarrantyDate: faker.date.future({ years: 1 }),
    invoiceNumber: faker.number.int().toString(),
  }

  const printer = Printer.create(
    {
      name: faker.commerce.productName(),
      printing: faker.helpers.arrayElement(['colorful', 'monochrome']),
      ipAddress: faker.internet.ipv4(),
      modelSlug: Slug.createFromText(device.model),
      type: faker.helpers.arrayElement(['laser', 'thermal', 'inkjet', 'dotmatrix']),
      ...device,
      ...override,
    },
    id,
  )

  return printer
}

export class PrinterFactory {
  constructor(private prisma: PrismaClient) {}

  async createPrinter(data: Partial<PrinterProps> = {}) {
    const printer = makePrinter(data)

    await this.prisma.printer.create({
      data: PrismaPrintersMapper.toPersistence(printer),
    })

    return printer
  }
}
