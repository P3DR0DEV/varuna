import type { FastifyInstance } from 'fastify'

import { createComputer } from './create-computer'
import { deleteComputer } from './delete-computer'
import { editComputer } from './edit-computer'
import { fetchAllComputers } from './fetch-all-computers'
import { getComputerByHostname } from './get-computer-by-hostname'
import { getComputerById } from './get-computer-by-id'
import { getComputerByIpAddress } from './get-computer-by-ip-address'
import { getComputerByTag } from './get-computer-by-tag'

export async function computerRoutes(app: FastifyInstance) {
  /* GET /computers?operatingSystem='' */
  fetchAllComputers(app)

  /* GET /computers/:id */
  getComputerById(app)

  /* GET /computers/hostname/:hostname */
  getComputerByHostname(app)

  /* GET /computers/ip/:ipAddress */
  getComputerByIpAddress(app)

  /* GET /computers/tag/:tag */
  getComputerByTag(app)

  /* PUT /computers/:id */
  editComputer(app)

  /* POST /computers */
  createComputer(app)

  /* DELETE /computers/:id */
  deleteComputer(app)
}
