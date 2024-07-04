import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { UserPresenter } from '../../presenters/user-presenter'
import { errors } from '../_errors'
import { fetchAllUsersUseCase } from './factories/make-fetch-all-users'

export async function fetchAllUsers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        summary: 'Fetch all users',
        tags: ['Users'],
      },
    },
    async (request, reply) => {
      const result = await fetchAllUsersUseCase.execute()

      if (result.isFailure()) {
        throw new errors.InternalServerError('Unexpected error')
      }

      const { users } = result.value

      return reply.status(200).send({
        users: users.map(UserPresenter.toHttp),
      })
    },
  )
}
