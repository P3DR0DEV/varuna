import { Service as PrismaService, Prisma, SERVICE_TYPES } from "@prisma/client"

import { Service, ServiceTypes } from "@/domain/it-manager/enterprise/entities/service"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export class PrismaServiceMapper {
  static toPersistence(service: Service): Prisma.ServiceUncheckedCreateInput {
    const type = MapServiceType.toPersistence(service.type)

    return {
      id: service.id.toString(),
      name: service.name,
      type,
      ipAddress: service.ipAddress,
      description: service.description,
      port: service.port,
    }
  }

  static toDomain(raw: PrismaService) {
    const id = new UniqueEntityID(raw.id)
    const type = MapServiceType.toDomain(raw.type)

    return Service.create(
      {
        name: raw.name,
        type,
        ipAddress: raw.ipAddress,
        description: raw.description,
        port: raw.port,
      },
      id,
    )
  }
}

export class MapServiceType {
  static toDomain(type: SERVICE_TYPES) {
    switch (type) {
      case "APPLICATION":
        return "application"
      case "DATABASE":
        return "database"
      case "INFRA":
        return "infra"
      default:
        return "application"
    }
  }

  static toPersistence(type: ServiceTypes) {
    switch (type) {
      case "application":
        return "APPLICATION"
      case "database":
        return "DATABASE"
      case "infra":
        return "INFRA"
      default:
        return "APPLICATION"
    }
  }
}