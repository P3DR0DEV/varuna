import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { IncidentPresenter, incidentsSchema } from '../../presenters/incident-presenter'
import { errors } from '../_errors'
import { fetchIncidentsByDeviceUseCase } from './factories/make-fetch-incidents-by-device'

export async function fetchIncidentsByDevice(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/device/:id',
    {
      schema: {
        tags: ['Incidents'],
        summary: 'Fetch incidents by device',
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        response: {
          200: z.object({
            incidents: z.array(incidentsSchema),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await fetchIncidentsByDeviceUseCase.execute({ deviceId: id })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { incidents } = result.value

      return reply.status(200).send({ incidents: incidents.map(IncidentPresenter.toHttp) })
    },
  )
}
