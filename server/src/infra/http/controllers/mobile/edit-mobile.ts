import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { MobilePresenter } from '../../presenters/mobile-presenter'
import { errors } from '../_errors'
import { editMobileUseCase } from './factories/make-edit-mobile'
import { editMobileSchema } from './schemas'

export async function editMobile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: editMobileSchema,
    },
    async (request, reply) => {
      const { id } = request.params
      const props = request.body

      const result = await editMobileUseCase.execute({ id, ...props })

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
