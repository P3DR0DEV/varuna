import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ServicePresenter, serviceSchema } from '../../presenters/service-presenter'
import { errors } from '../_errors'
import { editServiceUseCase } from './factories/make-edit-service'

export async function editService(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: {
        tags: ['Services'],
        summary: 'Edit a service',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          description: z.string(),
          ipAddress: z.string(),
          name: z.string(),
          port: z.coerce.number(),
          type: z.enum(['application', 'infra', 'database']),
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
      const props = request.body

      const result = await editServiceUseCase.execute({
        id,
        ...props,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { service } = result.value

      return reply.code(200).send({
        service: ServicePresenter.toHttp(service),
      })
    },
  )
}
