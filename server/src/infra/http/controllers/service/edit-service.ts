import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ServicePresenter } from '../../presenters/service-presenter'
import { errors } from '../_errors'
import { editServiceUseCase } from './factories/make-edit-service'
import { editServiceSchema } from './schemas'

export async function editService(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: editServiceSchema,
    },
    async (request, reply) => {
      const { id } = request.params
      const props = request.body

      const result = await editServiceUseCase.execute({
        id,
        ...props,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { service } = result.value

      return reply.code(200).send({
        service: ServicePresenter.toHttp(service),
      })
    },
  )
}
