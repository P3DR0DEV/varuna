import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { DepartmentPresenter, departmentSchema } from '../../presenters/department-presenter'
import { errors } from '../_errors'
import { createDepartmentUseCase } from './factories/make-create-department'

export async function createDepartment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Department'],
        summary: 'Create a new department',
        body: z.object({
          name: z.string(),
          description: z.string(),
          email: z.string().email().nullish(),
        }),
        response: {
          201: z.object({ department: departmentSchema }),
        },
      },
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
