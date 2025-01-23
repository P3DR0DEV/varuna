import type { IncidentRepository } from '@/domain/it-manager/application/repositories/incident-repository'
import type { Incident } from '@/domain/it-manager/enterprise/entities/incident'

export class InMemoryIncidentRepository implements IncidentRepository {
  public items: Incident[] = []

  async setIncidentAsFixed(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    this.items[index].setIncidentAsFixed()
  }

  async findById(id: string): Promise<Incident | null> {
    const incident = this.items.find((item) => item.id.toString() === id)
    if (!incident) {
      return null
    }
    return incident
  }

  async findByWorkstationId(workstationId: string): Promise<Incident[]> {
    const incident = this.items.filter((item) => item.workstationId.toString() === workstationId)

    return incident
  }

  async findByDeviceId(deviceId: string): Promise<Incident[]> {
    const incident = this.items.filter((item) => item.deviceId?.toString() === deviceId)

    return incident
  }

  async create(incident: Incident): Promise<void> {
    this.items.push(incident)
  }

  async save(incident: Incident): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === incident.id.toString())

    this.items[index] = incident
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(index, 1)
  }
}
