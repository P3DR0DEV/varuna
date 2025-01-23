import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { errors } from '../_errors'
import { deleteDepartmentUseCase } from './factories/make-delete-department'
import { deleteDepartmentSchema } from './schemas'

export async function deleteDepartment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      schema: deleteDepartmentSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteDepartmentUseCase.execute({ id })

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
