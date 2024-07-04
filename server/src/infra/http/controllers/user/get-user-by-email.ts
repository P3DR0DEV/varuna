import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { UserPresenter } from '../../presenters/user-presenter'
import { errors } from '../_errors'
import { getUserByEmailUseCase } from './factories/make-get-user-by-email'

export async function getUserByEmail(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/email/:email',
    {
      schema: {
        summary: 'Fetch all users',
        tags: ['Users'],
        params: z.object({
          email: z.string().email(),
        }),
      },
    },
    async (request, reply) => {
      const { email } = request.params

      const result = await getUserByEmailUseCase.execute({
        email,
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