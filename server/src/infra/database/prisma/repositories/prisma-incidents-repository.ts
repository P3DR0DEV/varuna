import { PrismaClient } from '@prisma/client'

import { IncidentRepository } from '@/domain/it-manager/application/repositories/incident-repository'
import { Incident } from '@/domain/it-manager/enterprise/entities/incident'

export class PrismaIncidentsRepository implements IncidentRepository {
  constructor(private prisma: PrismaClient) {}

  findById(id: string): Promise<Incident | null> {
    throw new Error('Method not implemented.')
  }

  findByWorkstationId(workstationId: string): Promise<Incident[]> {
    throw new Error('Method not implemented.')
  }

  findByDeviceId(deviceId: string): Promise<Incident[]> {
    throw new Error('Method not implemented.')
  }

  setIncidentAsFixed(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  create(incident: Incident): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(incident: Incident): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
