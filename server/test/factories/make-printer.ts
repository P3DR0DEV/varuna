import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Printer, PrinterProps } from '@/domain/it-manager/enterprise/entities/printer'

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
      type: faker.helpers.arrayElement(['laser', 'thermal', 'inkjet', 'dotmatrix']),
      ...device,
      ...override,
    },
    id,
  )

  return printer
}
