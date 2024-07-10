import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { errors } from '../_errors'
import { deleteMobileUseCase } from './factories/make-delete-mobile'

export async function deleteMobile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      schema: {
        tags: ['Mobiles'],
        summary: 'Delete a mobile',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            message: z.string(),
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

      const result = await deleteMobileUseCase.execute({
        id,
      })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { message } = result.value

      return reply.status(200).send({
        message,
      })
    },
  )
}
