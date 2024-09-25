import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { errors } from '../_errors'
import { deleteUserLicenseUseCase } from './factories/make-delete-user-license'
import { deleteUserLicenseRelationSchema } from './schemas'

export async function deleteRelation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      schema: deleteUserLicenseRelationSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteUserLicenseUseCase.execute({
        id,
      })

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
