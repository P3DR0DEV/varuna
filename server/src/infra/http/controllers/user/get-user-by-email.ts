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
