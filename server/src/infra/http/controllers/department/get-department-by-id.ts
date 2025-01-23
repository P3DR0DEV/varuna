import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { DepartmentPresenter } from '../../presenters/department-presenter'
import { errors } from '../_errors'
import { getDepartmentByIdUseCase } from './factories/make-get-department-by-id'
import { getDepartmentByIdSchema } from './schemas'

export async function getDepartmentById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/id/:id',
    {
      schema: getDepartmentByIdSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getDepartmentByIdUseCase.execute({ id })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { department } = result.value

      return reply.code(200).send({ department: DepartmentPresenter.toHttp(department) })
    },
  )
}
