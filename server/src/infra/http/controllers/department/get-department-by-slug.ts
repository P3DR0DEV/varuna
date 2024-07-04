import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { DepartmentPresenter, departmentSchema } from '../../presenters/department-presenter'
import { errors } from '../_errors'
import { getDepartmentBySlugUseCase } from './factories/make-get-department-by-slug'

export async function getDepartmentBySlug(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:slug',
    {
      schema: {
        tags: ['Department'],
        summary: 'Get department by slug',
        params: z.object({
          slug: z.string(),
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
