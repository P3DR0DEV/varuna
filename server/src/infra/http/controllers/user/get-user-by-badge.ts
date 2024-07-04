import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { UserPresenter } from '../../presenters/user-presenter'
import { errors } from '../_errors'
import { getUserByBadgeUseCase } from './factories/make-get-user-by-badge'

export async function getUserByBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/badge/:badge',
    {
      schema: {
        summary: 'Fetch all users',
        tags: ['Users'],
        params: z.object({
          badge: z.string(),
        }),

        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              phone: z.string().nullable(),
              badge: z.string(),
              departmentId: z.string(),
              workstationId: z.string().nullable(),
            }),
          }),

          400: z.object({
            name: z.string(),
            message: z.string(),
          }),

          404: z.object({
            name: z.string(),
            message: z.string(),
          }),
        },
      },
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
