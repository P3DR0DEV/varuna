import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { MobilePresenter, mobileSchema } from '../../presenters/mobile-presenter'
import { errors } from '../_errors'
import { getMobileByNameUseCase } from './factories/make-get-mobile-by-name'

export async function getMobileByName(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/name/:name',
    {
      schema: {
        tags: ['Mobiles'],
        summary: 'Get mobile by name',
        params: z.object({
          name: z.string(),
        }),
        response: {
          200: z.object({
            mobile: mobileSchema,
          }),
        },
      },
    },
    async (request, reply) => {
      const { name } = request.params

      const result = await getMobileByNameUseCase.execute({ name })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { mobile } = result.value

      return reply.status(200).send({
        mobile: MobilePresenter.toHttp(mobile),
      })
    },
  )
}
