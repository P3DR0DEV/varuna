import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { errors } from '../_errors'
import { deleteMobileUseCase } from './factories/make-delete-mobile'
import { deleteMobileSchema } from './schemas'

export async function deleteMobile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      schema: deleteMobileSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteMobileUseCase.execute({
        id,
      })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { message } = result.value

      return reply.status(200).send({
        message,
      })
    },
  )
}
