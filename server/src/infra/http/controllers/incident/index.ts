import { FastifyInstance } from 'fastify'

import { createIncident } from './create-incident'
import { deleteIncident } from './delete-incident'
import { editIncident } from './edit-incident'
import { fetchIncidentsByDevice } from './fetch-incidents-by-device'
import { fetchIncidentsByWorkstation } from './fetch-incidents-by-workstation'
import { getIncidentById } from './get-incident-by-id'
import { updateIncidentStatusToFixed } from './update-incident-status-to-fixed'

export async function incidentRoutes(app: FastifyInstance) {
  /** POST /incidents/ */
  createIncident(app)

  /** DELETE /incidents/:id */
  deleteIncident(app)

  /** GET /incidents/:id */
  getIncidentById(app)

  /** GET /incidents/workstation/:id */
  fetchIncidentsByWorkstation(app)

  /** GET /incidents/device/:id */
  fetchIncidentsByDevice(app)

  /** PUT /incidents/:id */
  editIncident(app)

  /** PATCH /incidents/:id/fixed */
  updateIncidentStatusToFixed(app)
}
