import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { DepartmentPresenter, departmentSchema } from '../../presenters/department-presenter'
import { errors } from '../_errors'
import { addChiefToDepartmentUseCase } from './factories/make-add-chief-to-department'

export async function addChiefToDepartment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/:id/chief',
    {
      schema: {
        tags: ['Department'],
        summary: 'Add chief to department',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          userId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            department: departmentSchema,
          }),
          400: z.object({
            name: z.string(),
            message: z.string(),
          }),
          404: z.object({
            name: z.string(),
            message: z.string(),
          }),
        },
      },
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
