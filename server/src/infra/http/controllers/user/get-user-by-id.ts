import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { UserPresenter } from '../../presenters/user-presenter'
import { errors } from '../_errors'
import { getUserByIdUseCase } from './factories/make-get-user-by-id'
import { getUserByIdSchema } from './schemas'

export async function getUserById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: getUserByIdSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getUserByIdUseCase.execute({
        id,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { user } = result.value

      return reply.status(200).send({
        user: UserPresenter.toHttp(user),
      })
    },
  )
}
