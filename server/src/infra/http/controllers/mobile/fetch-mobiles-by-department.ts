import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { MobilePresenter } from '../../presenters/mobile-presenter'
import { errors } from '../_errors'
import { fetchMobilesByDepartmentUseCase } from './factories/make-fetch-mobiles-by-department'
import { fetchMobilesByDepartmentSchema } from './schemas'

export async function fetchMobilesByDepartment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/department/:id',
    {
      schema: fetchMobilesByDepartmentSchema,
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
