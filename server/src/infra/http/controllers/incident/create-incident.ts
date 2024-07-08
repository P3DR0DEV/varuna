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
          deviceId: z.string().uuid(),
          workstationId: z.string().uuid(),
          description: z.string(),
        }),
        response: {
          201: z.object({ incident: incidentsSchema }),
          400: z.object({ name: z.string(), message: z.string() }),
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
