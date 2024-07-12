import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ServicePresenter, serviceSchema } from '../../presenters/service-presenter'
import { errors } from '../_errors'
import { fetchAllServicesUseCase } from './factories/make-fetch-all-services'

export async function fetchAllServices(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['Services'],
        summary: 'Fetch all services',
        querystring: z.object({
          type: z.enum(['application', 'database', 'infra']),
        }),
        response: {
          200: z.object({
            services: z.array(serviceSchema),
          }),
        },
      },
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
