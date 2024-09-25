import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { errors } from '../_errors'
import { deleteServiceUseCase } from './factories/make-delete-service'
import { deleteServiceSchema } from './schemas'

export async function deleteService(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      schema: deleteServiceSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteServiceUseCase.execute({ id })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { message } = result.value

      return reply.status(200).send({
        message,
      })
    },
  )
}
