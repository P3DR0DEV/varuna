import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { UserPresenter, usersSchema } from '../../presenters/user-presenter'
import { errors } from '../_errors'
import { getUserByIdUseCase } from './factories/make-get-user-by-id'

export async function getUserById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        summary: 'Get user by id',
        tags: ['Users'],
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),

        response: {
          200: z.object({
            user: usersSchema,
          }),
        },
      },
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
