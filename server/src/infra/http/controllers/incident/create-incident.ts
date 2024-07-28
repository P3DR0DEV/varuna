import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { IncidentPresenter, incidentsSchema } from '../../presenters/incident-presenter'
import { errors } from '../_errors'
import { createIncidentUseCase } from './factories/make-create-incident'

export async function createIncident(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Incidents'],
        summary: 'Create a new incident',
        body: z.object({
          description: z.string(),
          workstationId: z.string().uuid('Invalid ID type, must be a UUID'),
          deviceId: z.string().uuid('Invalid ID type, must be a UUID').nullish(),
        }),
        response: {
          201: z.object({ incident: incidentsSchema }),
        },
      },
    },
    async (request, reply) => {
      const { deviceId, workstationId, description } = request.body

      const result = await createIncidentUseCase.execute({
        deviceId,
        workstationId,
        description,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason
        throw new errors[name](message)
      }

      const { incident } = result.value

      return reply.status(201).send({ incident: IncidentPresenter.toHttp(incident) })
    },
  )
}
