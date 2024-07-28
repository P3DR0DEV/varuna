import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { IncidentPresenter, incidentsSchema } from '../../presenters/incident-presenter'
import { errors } from '../_errors'
import { getIncidentByIdUseCase } from './factories/make-get-incident-by-id'

export async function getIncidentById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['Incidents'],
        summary: 'Get an incident by id',
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        response: {
          200: z.object({
            incident: incidentsSchema,
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getIncidentByIdUseCase.execute({ id })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { incident } = result.value

      return reply.status(200).send({
        incident: IncidentPresenter.toHttp(incident),
      })
    },
  )
}
