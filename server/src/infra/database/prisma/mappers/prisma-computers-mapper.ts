import type { COMPUTER_TYPES, Prisma, Computer as PrismaComputer } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Computer, type ComputerTypes } from '@/domain/it-manager/enterprise/entities/computer'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

export class PrismaComputerMapper {
  static toDomain(raw: PrismaComputer): Computer {
    const id = new UniqueEntityID(raw.id)
    const operatingSystem = Slug.createFromText(raw.operatingSystem)
    const type = MapComputerType.toDomain(raw.type)

    return Computer.create(
      {
        hostname: raw.hostname,
        ipAddress: raw.ipAddress,
        operatingSystem,
        acquisitionDate: raw.acquisitionDate,
        description: raw.description,
        model: raw.model,
        serialNumber: raw.serialNumber,
        type,
        contractId: raw.contractId ? new UniqueEntityID(raw.contractId) : null,
        endWarrantyDate: raw.endWarrantyDate,
        invoiceNumber: raw.invoiceNumber,
        modelSlug: Slug.createFromText(raw.model),
        tag: raw.tag,
      },
      id,
    )
  }

  static toPersistence(computer: Computer): Prisma.ComputerUncheckedCreateInput {
    return {
      id: computer.id.toString(),
      hostname: computer.hostname,
      ipAddress: computer.ipAddress,
      operatingSystem: computer.operatingSystem,
      acquisitionDate: computer.acquisitionDate,
      description: computer.description,
      model: computer.model,
      serialNumber: computer.serialNumber,
      type: MapComputerType.toPersistence(computer.type),
      contractId: computer.contractId,
      endWarrantyDate: computer.endWarrantyDate,
      invoiceNumber: computer.invoiceNumber,
      tag: computer.tag,
      modelSlug: computer.modelSlug,
    }
  }
}

class MapComputerType {
  static toDomain(type: COMPUTER_TYPES): ComputerTypes {
    switch (type) {
      case 'DESKTOP':
        return 'desktop'
      case 'NOTEBOOK':
        return 'notebook'
      case 'SERVER':
        return 'server'
      default:
        return 'desktop'
    }
  }

  static toPersistence(type: ComputerTypes): COMPUTER_TYPES {
    switch (type) {
      case 'desktop':
        return 'DESKTOP'
      case 'notebook':
        return 'NOTEBOOK'
      case 'server':
        return 'SERVER'
      default:
        return 'DESKTOP'
    }
  }
}
