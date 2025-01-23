import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { errors } from '../_errors'
import { updateIncidentStatusToFixedUseCase } from './factories/make-update-incident-status-to-fixed'
import { updateIncidentStatusToFixedSchema } from './schemas'

export async function updateIncidentStatusToFixed(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/:id/fixed',
    {
      schema: updateIncidentStatusToFixedSchema,
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
