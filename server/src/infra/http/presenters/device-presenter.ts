import z from 'zod'

import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

export class DevicePresenter {
  static toHttp(device: Device<DeviceProps>) {
    return {
      id: device.id.toString(),
      acquisitionDate: device.acquisitionDate,
      model: device.model,
      serialNumber: device.serialNumber,
      contractId: device.contractId,
      endWarrantyDate: device.endWarrantyDate,
      invoiceNumber: device.invoiceNumber,
    }
  }
}

export const devicesSchema = z.object({
  id: z.string(),
  acquisitionDate: z.coerce.date(),
  model: z.string(),
  serialNumber: z.string(),
  contractId: z.string().nullish(),
  endWarrantyDate: z.coerce.date().nullish(),
  invoiceNumber: z.string().nullish(),
})
