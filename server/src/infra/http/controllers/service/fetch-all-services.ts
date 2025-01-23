import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ServicePresenter } from '../../presenters/service-presenter'
import { errors } from '../_errors'
import { fetchAllServicesUseCase } from './factories/make-fetch-all-services'
import { fetchAllServicesSchema } from './schemas'

export async function fetchAllServices(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: fetchAllServicesSchema,
    },
    async (request, reply) => {
      const { type } = request.query

      const result = await fetchAllServicesUseCase.execute({ type })

      if (result.isFailure()) {
        throw new errors.InternalServerError('Unexpected error')
      }

      const { services } = result.value

      return reply.status(200).send({
        services: services.map(ServicePresenter.toHttp),
      })
    },
  )
}
