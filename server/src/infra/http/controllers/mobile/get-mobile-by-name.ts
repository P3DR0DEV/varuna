import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { MobilePresenter } from '../../presenters/mobile-presenter'
import { errors } from '../_errors'
import { getMobileByNameUseCase } from './factories/make-get-mobile-by-name'
import { getMobileByNameSchema } from './schemas'

export async function getMobileByName(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/name/:name',
    {
      schema: getMobileByNameSchema,
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
