import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { UserPresenter, usersSchema } from '../../presenters/user-presenter'
import { errors } from '../_errors'
import { editUserUseCase } from './factories/make-edit-user'

export async function editUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: {
        summary: 'Edit a user',
        tags: ['Users'],
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string().nullable(),
          badge: z.string(),
          departmentId: z.string().nullish(),
          workstationId: z.string().nullish(),
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
      const props = request.body

      const result = await editUserUseCase.execute({ id, ...props })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { user } = result.value

      return reply.status(200).send({ user: UserPresenter.toHttp(user) })
    },
  )
}
