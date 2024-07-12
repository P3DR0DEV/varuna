import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ServicePresenter, serviceSchema } from '../../presenters/service-presenter'
import { errors } from '../_errors'
import { getServiceByIdUseCase } from './factories/make-get-service-by-id'

export async function getServiceById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['Services'],
        summary: 'Get service by id',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            service: serviceSchema,
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
