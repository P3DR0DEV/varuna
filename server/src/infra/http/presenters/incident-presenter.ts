import z from 'zod'

import { Incident } from '@/domain/it-manager/enterprise/entities/incident'

export class IncidentPresenter {
  static toHttp(incident: Incident) {
    return {
      id: incident.id.toString(),
      description: incident.description,
      workstationId: incident.workstationId.toString(),
      deviceId: incident.deviceId?.toString(),
      fixedAt: incident.fixedAt,
    }
  }
}

export const incidentsSchema = z.object({
  id: z.string(),
  description: z.string(),
  workstationId: z.string(),
  deviceId: z.string().nullish(),
  fixedAt: z.coerce.date().nullish(),
})
