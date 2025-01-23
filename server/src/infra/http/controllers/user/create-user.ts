import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { UserPresenter } from '../../presenters/user-presenter'
import { errors } from '../_errors'
import { createUserUseCase } from './factories/make-create-user'
import { createUserSchema } from './schemas'

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: createUserSchema,
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
