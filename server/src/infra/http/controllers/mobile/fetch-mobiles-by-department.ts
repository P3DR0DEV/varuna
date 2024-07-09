import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { MobilePresenter, mobileSchema } from '../../presenters/mobile-presenter'
import { errors } from '../_errors'
import { fetchMobilesByDepartmentUseCase } from './factories/make-fetch-mobiles-by-department'

export async function fetchMobilesByDepartment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/department/:id',
    {
      schema: {
        tags: ['Mobiles'],
        summary: 'Fetch mobiles by department',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            mobiles: z.array(mobileSchema),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await fetchMobilesByDepartmentUseCase.execute({ departmentId: id })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { mobiles } = result.value

      return reply.status(200).send({
        mobiles: mobiles.map(MobilePresenter.toHttp),
      })
    },
  )
}
