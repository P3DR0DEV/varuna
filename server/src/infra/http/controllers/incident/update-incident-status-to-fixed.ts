import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '../_errors'
import { updateIncidentStatusToFixedUseCase } from './factories/make-update-incident-status-to-fixed'

export async function updateIncidentStatusToFixed(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/:id/fixed',
    {
      schema: {
        tags: ['Incidents'],
        summary: 'Set incident as fixed',
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await updateIncidentStatusToFixedUseCase.execute({ id })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { message } = result.value

      return reply.code(200).send({ message })
    },
  )
}
