import { PrismaClient } from '@prisma/client'

import { IncidentRepository } from '@/domain/it-manager/application/repositories/incident-repository'
import { Incident } from '@/domain/it-manager/enterprise/entities/incident'

import { PrismaIncidentsMapper } from '../mappers/prisma-incidents-mapper'

export class PrismaIncidentsRepository implements IncidentRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Incident | null> {
    const incident = await this.prisma.incident.findUnique({ where: { id } })

    if (!incident) {
      return null
    }

    return PrismaIncidentsMapper.toDomain(incident)
  }

  async findByWorkstationId(workstationId: string): Promise<Incident[]> {
    const incidents = await this.prisma.incident.findMany({
      where: { workstationId },
    })

    return incidents.map(PrismaIncidentsMapper.toDomain)
  }

  async findByDeviceId(deviceId: string): Promise<Incident[]> {
    const incidents = await this.prisma.incident.findMany({
      where: { deviceId },
    })

    return incidents.map(PrismaIncidentsMapper.toDomain)
  }

  async setIncidentAsFixed(id: string): Promise<void> {
    await this.prisma.incident.update({
      where: { id },
      data: { fixedAt: new Date() },
    })
  }

  async create(incident: Incident): Promise<void> {
    const data = PrismaIncidentsMapper.toPersistence(incident)

    await this.prisma.incident.create({ data })
  }

  async save(incident: Incident): Promise<void> {
    const data = PrismaIncidentsMapper.toPersistence(incident)

    await this.prisma.incident.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.incident.delete({ where: { id } })
  }
}
