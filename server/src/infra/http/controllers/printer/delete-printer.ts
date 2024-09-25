import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { errors } from '../_errors'
import { deletePrinterUseCase } from './factories/make-delete-printer'
import { deletePrinterSchema } from './schemas'

export async function deletePrinter(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      schema: deletePrinterSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deletePrinterUseCase.execute({ id })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { message } = result.value

      return reply.status(200).send({ message })
    },
  )
}
