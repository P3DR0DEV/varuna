import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ServicePresenter, serviceSchema } from '../../presenters/service-presenter'
import { errors } from '../_errors'
import { fetchServicesByIpAddressUseCase } from './factories/make-fetch-services-by-ip-address'

export async function fetchServicesByIpAddress(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/ip/:ip',
    {
      schema: {
        tags: ['Services'],
        summary: 'Fetch services by IP address',
        params: z.object({
          ip: z.string().ip({ version: 'v4' }),
        }),
        response: {
          200: z.object({
            services: z.array(serviceSchema),
          }),
        },
      },
    },
    async (request, reply) => {
      const { ip } = request.params

      const result = await fetchServicesByIpAddressUseCase.execute({ ipAddress: ip })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { services } = result.value

      return reply.status(200).send({
        services: services.map(ServicePresenter.toHttp),
      })
    },
  )
}
