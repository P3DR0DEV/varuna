import { IncidentRepository } from '@/domain/it-manager/application/repositories/incident-repository'
import { Incident } from '@/domain/it-manager/enterprise/entities/incident'

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

  async findByWorkstationId(workstationId: string): Promise<Incident | null> {
    const incident = this.items.find((item) => item.workstationId === workstationId)
    if (!incident) {
      return null
    }
    return incident
  }

  async findByDeviceId(deviceId: string): Promise<Incident | null> {
    const incident = this.items.find((item) => item.deviceId === deviceId)

    if (!incident) {
      return null
    }
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
