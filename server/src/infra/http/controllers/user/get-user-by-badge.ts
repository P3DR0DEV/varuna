import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { UserPresenter } from '../../presenters/user-presenter'
import { errors } from '../_errors'
import { getUserByBadgeUseCase } from './factories/make-get-user-by-badge'
import { getUserByBadgeSchema } from './schemas'

export async function getUserByBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/badge/:badge',
    {
      schema: getUserByBadgeSchema,
    },
    async (request, reply) => {
      const { badge } = request.params

      const result = await getUserByBadgeUseCase.execute({
        badge,
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
