import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { DepartmentPresenter } from '../../presenters/department-presenter'
import { errors } from '../_errors'
import { createDepartmentUseCase } from './factories/make-create-department'
import { createDepartmentSchema } from './schemas'

export async function createDepartment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: createDepartmentSchema,
    },
    async (request, reply) => {
      const props = request.body

      const result = await createDepartmentUseCase.execute(props)

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { department } = result.value

      return reply.status(201).send({
        department: DepartmentPresenter.toHttp(department),
      })
    },
  )
}
