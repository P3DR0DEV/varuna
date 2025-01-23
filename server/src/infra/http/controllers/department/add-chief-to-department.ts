import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { DepartmentPresenter } from '../../presenters/department-presenter'
import { errors } from '../_errors'
import { addChiefToDepartmentUseCase } from './factories/make-add-chief-to-department'
import { addChiefToDepartmentSchema } from './schemas'

export async function addChiefToDepartment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/:id/chief',
    {
      schema: addChiefToDepartmentSchema,
    },
    async (request, reply) => {
      const { id } = request.params
      const { userId } = request.body

      const result = await addChiefToDepartmentUseCase.execute({ departmentId: id, chiefId: userId })

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
