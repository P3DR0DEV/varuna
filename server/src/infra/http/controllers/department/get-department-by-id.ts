import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { DepartmentPresenter, departmentSchema } from '../../presenters/department-presenter'
import { errors } from '../_errors'
import { getDepartmentByIdUseCase } from './factories/make-get-department-by-id'

export async function getDepartmentById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/id/:id',
    {
      schema: {
        tags: ['Department'],
        summary: 'Get department by id',
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        response: {
          200: z.object({
            department: departmentSchema,
          }),
        },
      },
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
