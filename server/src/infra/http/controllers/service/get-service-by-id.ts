import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ServicePresenter } from '../../presenters/service-presenter'
import { errors } from '../_errors'
import { getServiceByIdUseCase } from './factories/make-get-service-by-id'
import { getServiceByIdSchema } from './schemas'

export async function getServiceById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: getServiceByIdSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getServiceByIdUseCase.execute({ id })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { service } = result.value

      return reply.code(200).send({
        service: ServicePresenter.toHttp(service),
      })
    },
  )
}
