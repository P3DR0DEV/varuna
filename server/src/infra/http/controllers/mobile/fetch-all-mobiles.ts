import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { MobilePresenter, mobileSchema } from '../../presenters/mobile-presenter'
import { errors } from '../_errors'
import { fetchAllMobilesUseCase } from './factories/make-fetch-all-mobiles'

export function fetchAllMobiles(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['Mobiles'],
        summary: 'Fetch all mobiles',
        querystring: z.object({
          type: z.enum(['cellphone', 'tablet']),
        }),
        response: {
          200: z.object({ mobiles: z.array(mobileSchema) }),
        },
      },
    },
    async (request, reply) => {
      const { type } = request.query

      const result = await fetchAllMobilesUseCase.execute({
        type,
      })

      if (result.isFailure()) {
        throw new errors.InternalServerError('Unexpected error')
      }

      const { mobiles } = result.value

      return reply.status(200).send({
        mobiles: mobiles.map(MobilePresenter.toHttp),
      })
    },
  )
}
