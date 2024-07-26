import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { UserPresenter, usersSchema } from '../../presenters/user-presenter'
import { errors } from '../_errors'
import { fetchAllUsersByDepartmentUseCase } from './factories/make-fetch-all-users-by-department'

export async function fetchAllUsersByDepartment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/department/:departmentId',
    {
      schema: {
        summary: 'Fetch all users by department',
        tags: ['Users'],
        params: z.object({
          departmentId: z.string().uuid('Invalid ID type, must be a UUID'),
        }),

        response: {
          200: z.object({
            users: z.array(usersSchema),
          }),
        },
      },
    },
    async (request, reply) => {
      const { departmentId } = request.params

      const result = await fetchAllUsersByDepartmentUseCase.execute({
        departmentId,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { users } = result.value

      return reply.status(200).send({
        users: users.map(UserPresenter.toHttp),
      })
    },
  )
}
