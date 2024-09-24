import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { DepartmentPresenter } from '../../presenters/department-presenter'
import { errors } from '../_errors'
import { fetchAllDepartmentsUseCase } from './factories/make-fetch-all-departments'
import { fetchAllDepartmentsSchema } from './schemas'

export async function fetchAllDepartments(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: fetchAllDepartmentsSchema,
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
