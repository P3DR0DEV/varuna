import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { errors } from '../_errors'
import { deleteIncidentUseCase } from './factories/make-delete-incident'
import { deleteIncidentSchema } from './schemas'

export async function deleteIncident(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      schema: deleteIncidentSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteIncidentUseCase.execute({ id })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { message } = result.value

      return reply.code(200).send({ message })
    },
  )
}
