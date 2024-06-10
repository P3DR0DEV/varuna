import { Incident } from '@/domain/it-manager/enterprise/entities/incident'

export interface IncidentRepository {
  findById(id: string): Promise<Incident | null>
  findByWorkstationId(workstationId: string): Promise<Incident | null>
  findByDeviceId(deviceId: string): Promise<Incident | null>

  setIncidentAsFixed(id: string): Promise<void>
  create(incident: Incident): Promise<void>
  save(incident: Incident): Promise<void>
  delete(id: string): Promise<void>
}
