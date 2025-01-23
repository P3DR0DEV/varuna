import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { MobilePresenter } from '../../presenters/mobile-presenter'
import { errors } from '../_errors'
import { getMobileByTagUseCase } from './factories/make-get-mobile-by-tag'
import { getMobileByTagSchema } from './schemas'

export async function getMobileByTag(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/tag/:tag',
    {
      schema: getMobileByTagSchema,
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
