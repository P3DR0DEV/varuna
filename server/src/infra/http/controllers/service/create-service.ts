import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ServicePresenter } from '../../presenters/service-presenter'
import { errors } from '../_errors'
import { createServiceUseCase } from './factories/make-create-service'
import { createServiceSchema } from './schemas'

export async function createService(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: createServiceSchema,
    },
    async (request, reply) => {
      const props = request.body

      const result = await createServiceUseCase.execute(props)

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { service } = result.value

      return reply.status(201).send({
        service: ServicePresenter.toHttp(service),
      })
    },
  )
}
