import { Mobile, MobileTypes } from "@/domain/it-manager/enterprise/entities/mobile"
import { MOBILE_TYPES, Prisma, Mobile as PrismaMobile } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from "@/domain/it-manager/enterprise/entities/value-objects/slug"
import { Phone } from "@/domain/it-manager/enterprise/entities/value-objects/phone"
export class PrismaMobilesMapper {
  static toDomain(raw: PrismaMobile): Mobile{
    const id = new UniqueEntityID(raw.id)
    const modelSlug = Slug.createFromText(raw.model)
    const operatingSystem = Slug.createFromText(raw.operatingSystem)
    const number = raw.number ? new Phone(raw.number) : null
    const type = MapMobileType.toDomain(raw.type)

    return Mobile.create({
      acquisitionDate: raw.acquisitionDate,
      model: raw.model,
      name: raw.name,
      operatingSystem,
      serialNumber: raw.serialNumber,
      type,
      contractId: raw.contractId ? new UniqueEntityID(raw.contractId) : null,
      departmentId: raw.departmentId ? new UniqueEntityID(raw.departmentId) : null,
      endWarrantyDate: raw.endWarrantyDate,
      invoiceNumber: raw.invoiceNumber,
      number,
      numberProvider: raw.numberProvider,
      modelSlug,
    }, id)
  }

  static toPersistence(mobile: Mobile): Prisma.MobileUncheckedCreateInput{
    return {
      id: mobile.id.toString(),
      acquisitionDate: mobile.acquisitionDate,
      model: mobile.model,
      name: mobile.name,
      operatingSystem: mobile.operatingSystem,
      serialNumber: mobile.serialNumber,
      type: MapMobileType.toPersistence(mobile.type),
      contractId: mobile.contractId?.toString(),
      departmentId: mobile.departmentId?.toString(),
      endWarrantyDate: mobile.endWarrantyDate,
      invoiceNumber: mobile.invoiceNumber,
      number: mobile.number?.toString(),
      numberProvider: mobile.numberProvider,
      modelSlug: mobile.modelSlug,
    }
  }
}

class MapMobileType {
  static toDomain(type: MOBILE_TYPES): MobileTypes {
    switch (type) {
      case 'CELLPHONE':
        return 'cellphone'
      case 'TABLET':
        return 'tablet'
      default:
        return 'cellphone'
    }
  }

  static toPersistence(type: MobileTypes): MOBILE_TYPES {
    switch (type) {
      case 'cellphone':
        return 'CELLPHONE'
      case 'tablet':
        return 'TABLET'
      default:
        return 'CELLPHONE'
    }
  }
}