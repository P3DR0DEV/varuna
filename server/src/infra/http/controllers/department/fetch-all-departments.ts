import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { DepartmentPresenter, departmentSchema } from '../../presenters/department-presenter'
import { errors } from '../_errors'
import { fetchAllDepartmentsUseCase } from './factories/make-fetch-all-departments'

export async function fetchAllDepartments(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['Department'],
        summary: 'Fetch all departments',
        response: {
          200: z.object({
            departments: z.array(departmentSchema),
          }),
          500: z.object({
            name: z.string(),
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await fetchAllDepartmentsUseCase.execute()

      if (result.isFailure()) {
        throw new errors.InternalServerError('Unexpected error')
      }

      const { departments } = result.value

      return reply.status(200).send({
        departments: departments.map(DepartmentPresenter.toHttp),
      })
    },
  )
}
