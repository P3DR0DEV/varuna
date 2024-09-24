import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { UserPresenter, usersSchema } from '../../presenters/user-presenter'
import { errors } from '../_errors'
import { createUserUseCase } from './factories/make-create-user'

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Users'],
        summary: 'Create a new user',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          badge: z.string(),
          departmentId: z.string().uuid('Invalid ID type, must be a UUID').nullish(),
          workstationId: z.string().uuid('Invalid ID type, must be a UUID').nullish(),
        }),

        response: {
          201: z.object({
            user: usersSchema,
          }),
        },
      },
    },
    async (request, reply) => {
      const props = request.body

      const result = await createUserUseCase.execute(props)

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { user } = result.value

      return reply.status(201).send({ user: UserPresenter.toHttp(user) })
    },
  )
}
