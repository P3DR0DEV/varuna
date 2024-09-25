import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { MobilePresenter } from '../../presenters/mobile-presenter'
import { errors } from '../_errors'
import { fetchAllMobilesUseCase } from './factories/make-fetch-all-mobiles'
import { fetchAllMobilesSchema } from './schemas'

export function fetchAllMobiles(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: fetchAllMobilesSchema,
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
