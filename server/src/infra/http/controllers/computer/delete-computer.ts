import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { errors } from '../_errors'
import { deleteComputerUseCase } from './factories/make-delete-computer'
import { deleteComputerSchema } from './schemas'

export async function deleteComputer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      schema: deleteComputerSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteComputerUseCase.execute({ id })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { message } = result.value

      return reply.status(200).send({ message })
    },
  )
}
