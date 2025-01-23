import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { MobilePresenter } from '../../presenters/mobile-presenter'
import { errors } from '../_errors'
import { createMobileUseCase } from './factories/make-create-mobile'
import { createMobileSchema } from './schemas'

export async function createMobile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: createMobileSchema,
    },
    async (request, reply) => {
      const props = request.body

      const result = await createMobileUseCase.execute(props)

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { mobile } = result.value

      return reply.status(201).send({
        mobile: MobilePresenter.toHttp(mobile),
      })
    },
  )
}
