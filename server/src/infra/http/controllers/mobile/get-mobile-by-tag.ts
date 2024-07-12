import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { MobilePresenter, mobileSchema } from '../../presenters/mobile-presenter'
import { errors } from '../_errors'
import { getMobileByTagUseCase } from './factories/make-get-mobile-by-tag'

export async function getMobileByTag(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/tag/:tag',
    {
      schema: {
        tags: ['Mobiles'],
        summary: 'Get mobile by tag',
        params: z.object({
          tag: z.string(),
        }),
        response: {
          200: z.object({
            mobile: mobileSchema,
          }),
          400: z.object({
            name: z.string(),
            message: z.string(),
          }),
          404: z.object({
            name: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { tag } = request.params

      const result = await getMobileByTagUseCase.execute({ tag })

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
