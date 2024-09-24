import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { DepartmentPresenter } from '../../presenters/department-presenter'
import { errors } from '../_errors'
import { editDepartmentUseCase } from './factories/make-edit-department'
import { editDepartmentSchema } from './schemas'

export async function editDepartment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: editDepartmentSchema,
    },
    async (request, reply) => {
      const { id } = request.params
      const props = request.body

      const result = await editDepartmentUseCase.execute({ id, ...props })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { department } = result.value

      return reply.status(200).send({
        department: DepartmentPresenter.toHttp(department),
      })
    },
  )
}
