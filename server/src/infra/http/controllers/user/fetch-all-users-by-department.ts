import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { UserPresenter } from '../../presenters/user-presenter'
import { errors } from '../_errors'
import { fetchAllUsersByDepartmentUseCase } from './factories/make-fetch-all-users-by-department'
import { fetchAllUsersByDepartmentSchema } from './schemas'

export async function fetchAllUsersByDepartment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/department/:departmentId',
    {
      schema: fetchAllUsersByDepartmentSchema,
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
