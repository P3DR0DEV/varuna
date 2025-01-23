import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { UserPresenter } from '../../presenters/user-presenter'
import { errors } from '../_errors'
import { editUserUseCase } from './factories/make-edit-user'
import { editUserSchema } from './schemas'

export async function editUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: editUserSchema,
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
