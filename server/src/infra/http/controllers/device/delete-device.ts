import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { errors } from '../_errors'
import { deleteDeviceUseCase } from './factories/make-delete-device'
import { deleteDeviceSchema } from './schemas'

export async function deleteDevice(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      schema: deleteDeviceSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteDeviceUseCase.execute({ id })

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
