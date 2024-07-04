import z from 'zod'

import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

export class ComputerPresenter {
  static toHttp(computer: Computer) {
    return {
      id: computer.id.toString(),
      acquisitionDate: computer.acquisitionDate,
      description: computer.description,
      hostname: computer.hostname,
      ipAddress: computer.ipAddress,
      model: computer.model,
      operatingSystem: computer.operatingSystem,
      serialNumber: computer.serialNumber,
      type: computer.type,
      contractId: computer.contractId,
      endWarrantyDate: computer.endWarrantyDate,
      invoiceNumber: computer.invoiceNumber,
    }
  }
}

export const computersSchema = z.object({
  id: z.string(),
  acquisitionDate: z.coerce.date(),
  description: z.string(),
  hostname: z.string(),
  ipAddress: z.string(),
  model: z.string(),
  operatingSystem: z.string(),
  serialNumber: z.string(),
  type: z.enum(['server', 'notebook', 'desktop']),
  contractId: z.string().nullish(),
  endWarrantyDate: z.coerce.date().nullish(),
  invoiceNumber: z.string().nullish(),
})
