import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Incident, IncidentProps } from '@/domain/it-manager/enterprise/entities/incident'
import { PrismaIncidentsMapper } from '@/infra/database/prisma/mappers/prisma-incidents-mapper'

export function makeIncident(override: Partial<IncidentProps> = {}, id?: UniqueEntityID) {
  const incident = Incident.create(
    {
      description: faker.lorem.sentence(),
      workstationId: new UniqueEntityID(),
      deviceId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return incident
}

export class IncidentFactory {
  constructor(private prisma: PrismaClient) {}

  async createIncident(data: Partial<IncidentProps> = {}) {
    const incident = makeIncident(data)

    await this.prisma.incident.create({ data: PrismaIncidentsMapper.toPersistence(incident) })

    return incident
  }
}
