import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { MobilePresenter } from '../../presenters/mobile-presenter'
import { errors } from '../_errors'
import { getMobileByIdUseCase } from './factories/make-get-mobile-by-id'
import { getMobileByIdSchema } from './schemas'

export async function getMobileById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: getMobileByIdSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getMobileByIdUseCase.execute({ id })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { mobile } = result.value

      return reply.status(200).send({
        mobile: MobilePresenter.toHttp(mobile),
      })
    },
  )
}
