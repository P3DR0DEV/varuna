import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { DepartmentPresenter } from '../../presenters/department-presenter'
import { errors } from '../_errors'
import { getDepartmentBySlugUseCase } from './factories/make-get-department-by-slug'
import { getDepartmentBySlugSchema } from './schemas'

export async function getDepartmentBySlug(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:slug',
    {
      schema: getDepartmentBySlugSchema,
    },
    async (request, reply) => {
      const { slug } = request.params

      const result = await getDepartmentBySlugUseCase.execute({ slug })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { department } = result.value

      return reply.code(200).send({ department: DepartmentPresenter.toHttp(department) })
    },
  )
}
