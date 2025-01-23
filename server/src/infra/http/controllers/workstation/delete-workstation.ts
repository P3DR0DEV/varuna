import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { errors } from '../_errors'
import { deleteWorkstationUseCase } from './factories/make-delete-workstation'
import { deleteWorkstationSchema } from './schemas'

export async function deleteWorkstation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      schema: deleteWorkstationSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteWorkstationUseCase.execute({ id })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { message } = result.value

      return reply.status(200).send({ message })
    },
  )
}
