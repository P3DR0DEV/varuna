import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ServicePresenter } from '../../presenters/service-presenter'
import { errors } from '../_errors'
import { fetchServicesByIpAddressUseCase } from './factories/make-fetch-services-by-ip-address'
import { fetchServicesByIpAddressSchema } from './schemas'

export async function fetchServicesByIpAddress(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/ip/:ip',
    {
      schema: fetchServicesByIpAddressSchema,
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
