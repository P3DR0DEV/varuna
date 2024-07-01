import { Device as PrismaDevice, Prisma } from "@prisma/client"

import { Device, DeviceProps } from "@/domain/it-manager/enterprise/entities/device"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Slug } from "@/domain/it-manager/enterprise/entities/value-objects/slug"

export class PrismaDevicesMapper {
  static toDomain(raw: PrismaDevice): Device<DeviceProps> {
    const id = new UniqueEntityID(raw.id)
    const modelSlug = Slug.createFromText(raw.model)

    return Device.create(
      {
        serialNumber: raw.serialNumber,
        model: raw.model,
        invoiceNumber: raw.invoiceNumber,
        acquisitionDate: raw.acquisitionDate,
        modelSlug,
        contractId: raw.contractId ? new UniqueEntityID(raw.contractId) : null,
        endWarrantyDate: raw.endWarrantyDate,
      },
      id,
    )
  }

  static toPersistence(device: Device<DeviceProps>): Prisma.DeviceUncheckedCreateInput {
    return {
      id: device.id.toString(),
      serialNumber: device.serialNumber,
      model: device.model,
      invoiceNumber: device.invoiceNumber,
      acquisitionDate: device.acquisitionDate,
      modelSlug: device.modelSlug,
      contractId: device.contractId,
      endWarrantyDate: device.endWarrantyDate,
    }
  }
}