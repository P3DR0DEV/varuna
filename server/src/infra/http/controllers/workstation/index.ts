import type { FastifyInstance } from 'fastify'

import { createWorkstation } from './create-workstation'
import { deleteWorkstation } from './delete-workstation'
import { editWorkstation } from './edit-workstation'
import { fetchAllWorkstations } from './fetch-all-workstations'
import { getWorkstationByComputer } from './get-workstation-by-computer'
import { getWorkstationById } from './get-workstation-by-id'

export async function workstationRoutes(app: FastifyInstance) {
  /** GET /workstations/ */
  fetchAllWorkstations(app)

  /** POST /workstations/ */
  createWorkstation(app)

  /** GET /workstations/:id */
  getWorkstationById(app)

  /** PUT /workstations/:id */
  editWorkstation(app)

  /** GET /workstations/computer/:id */
  getWorkstationByComputer(app)

  /** DELETE /workstations/:id */
  deleteWorkstation(app)
}
