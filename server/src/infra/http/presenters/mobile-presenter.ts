import z from 'zod'

import { Mobile } from '@/domain/it-manager/enterprise/entities/mobile'

export class MobilePresenter {
  static toHttp(mobile: Mobile) {
    return {
      id: mobile.id.toString(),
      name: mobile.name,
      type: mobile.type,
      number: mobile.number?.value,
      acquisitionDate: mobile.acquisitionDate,
      endWarrantyDate: mobile.endWarrantyDate,
      invoiceNumber: mobile.invoiceNumber,
      serialNumber: mobile.serialNumber,
      model: mobile.model,
      numberProvider: mobile.numberProvider,
      departmentId: mobile.departmentId?.toString(),
      contractId: mobile.contractId?.toString(),
      operatingSystem: mobile.operatingSystem,
    }
  }
}

export const mobileSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['tablet', 'cellphone']),
  acquisitionDate: z.coerce.date(),
  serialNumber: z.string(),
  model: z.string(),
  operatingSystem: z.string(),
  number: z.string().nullish(),
  endWarrantyDate: z.coerce.date().nullish(),
  invoiceNumber: z.string().nullish(),
  numberProvider: z.string().nullish(),
  departmentId: z.string().nullish(),
  contractId: z.string().nullish(),
})
