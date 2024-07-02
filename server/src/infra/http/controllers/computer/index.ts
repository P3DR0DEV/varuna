import { FastifyInstance } from 'fastify'

import { createComputer } from './create-computer'

export async function ComputerRoutes(app: FastifyInstance) {
  /* /computers */
  app.register(createComputer)
}
