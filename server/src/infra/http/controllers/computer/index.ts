import { FastifyInstance } from 'fastify'

import { createComputer } from './create-computer'
import { deleteComputer } from './delete-computer'
import { editComputer } from './edit-computer'
import { fetchAllComputers } from './fetch-all-computers'
import { getComputerByHostname } from './get-computer-by-hostname'
import { getComputerById } from './get-computer-by-id'
import { getComputerByIpAddress } from './get-computer-by-ip-address'

export async function ComputerRoutes(app: FastifyInstance) {
  /* GET /computers?operatingSystem='' */
  app.register(fetchAllComputers)

  /* GET /computers/:id */
  app.register(getComputerById)

  /* GET /computers/hostname/:hostname */
  app.register(getComputerByHostname)

  /* GET /computers/ip/:ipAddress */
  app.register(getComputerByIpAddress)

  /* PUT /computers/:id */
  app.register(editComputer)

  /* POST /computers */
  app.register(createComputer)

  /* DELETE /computers/:id */
  app.register(deleteComputer)
}
