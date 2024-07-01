import { Prisma, Incident as PrismaIncident } from "@prisma/client"
import { Incident } from "@/domain/it-manager/enterprise/entities/incident"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export class PrismaIncidentsMapper {
  static toDomain(raw: PrismaIncident): Incident {
    const id = new UniqueEntityID(raw.id)
    const workstationId = new UniqueEntityID(raw.workstationId)

    return Incident.create(
      {
        workstationId,
        description: raw.description,
        fixedAt: raw.fixedAt,
        deviceId: raw.deviceId ? new UniqueEntityID(raw.deviceId): null,
      },
      id
    )
  }

  static toPersistence(incident: Incident): Prisma.IncidentUncheckedCreateInput {
    return {
      id: incident.id.toString(),
      description: incident.description,
      fixedAt: incident.fixedAt,
      workstationId: incident.workstationId.toString(),
      deviceId: incident.deviceId?.toString(),
    }
  }
}