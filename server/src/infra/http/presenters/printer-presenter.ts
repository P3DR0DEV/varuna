import { Printer } from "@/domain/it-manager/enterprise/entities/printer";
import z from "zod";

export class PrinterPresenter {
  static toHttp(printer: Printer) {
    return {
      id: printer.id.toString(),
      name: printer.name,
      ip: printer.ipAddress,
      serialNumber: printer.serialNumber,
      tag: printer.tag,
      acquisitionDate: printer.acquisitionDate,
      model: printer.model,
      printing: printer.printing,
      endWarrantyDate: printer.endWarrantyDate,
      type: printer.type,
      observations: printer.observations,
      invoiceNumber: printer.invoiceNumber
    }
  }

  static toDashboard(printer: Printer) {
    return {
      id: printer.id.toString(),
      name: printer.name,
      ip: printer.ipAddress,
      tag: printer.tag,
      type: printer.type,
      printing: printer.printing
    }
  }
}

export const printerSchema = z.object({
  id: z.string(),
  name: z.string(),
  ip: z.string().ip({ version: 'v4' }).nullish(),
  serialNumber: z.string(),
  tag: z.string().nullish(),
  acquisitionDate: z.coerce.date(),
  model: z.string(),
  printing: z.enum(['colorful', 'monochrome']),
  endWarrantyDate: z.coerce.date().nullish(),
  type: z.enum(['inkjet', 'laser', 'thermal', 'dotmatrix']),
  observations: z.string().nullish(),
  invoiceNumber: z.string().nullish()
})

export const printersToDashboardSchema = z.object({
  id: z.string(),
  name: z.string(),
  ip: z.string().ip({ version: 'v4' }).nullish(),
  tag: z.string().nullish(),
  type: z.enum(['inkjet', 'laser', 'thermal', 'dotmatrix']),
  printing: z.enum(['colorful', 'monochrome'])
})