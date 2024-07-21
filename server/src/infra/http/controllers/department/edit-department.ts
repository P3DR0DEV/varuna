import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { DepartmentPresenter, departmentSchema } from '../../presenters/department-presenter'
import { errors } from '../_errors'
import { editDepartmentUseCase } from './factories/make-edit-department'

export async function editDepartment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: {
        tags: ['Department'],
        summary: 'Edit a department',
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        body: z.object({
          name: z.string(),
          description: z.string(),
          slug: z.string(),
          email: z.string().email().nullable(),
          chiefId: z.string().uuid().nullable(),
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
