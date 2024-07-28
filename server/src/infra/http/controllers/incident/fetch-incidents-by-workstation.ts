import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { IncidentPresenter, incidentsSchema } from '../../presenters/incident-presenter'
import { errors } from '../_errors'
import { fetchIncidentsByWorkstationUseCase } from './factories/make-fetch-incidents-by-workstation'

export async function fetchIncidentsByWorkstation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/workstation/:id',
    {
      schema: {
        tags: ['Incidents'],
        summary: 'Fetch incidents by workstation id',
        params: z.object({
          id: z.string().uuid(),
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

      const result = await fetchIncidentsByWorkstationUseCase.execute({ workstationId: id })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { incidents } = result.value

      return reply.status(200).send({
        incidents: incidents.map(IncidentPresenter.toHttp),
      })
    },
  )
}
