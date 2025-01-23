import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ComputerPresenter } from '../../presenters/computer-presenter'
import { errors } from '../_errors'
import { getComputerByIdUseCase } from './factories/make-get-computer-by-id'
import { getComputerByIdSchema } from './schemas'

export async function getComputerById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: getComputerByIdSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getComputerByIdUseCase.execute({ id })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { computer } = result.value

      return reply.status(200).send({ computer: ComputerPresenter.toHttp(computer) })
    },
  )
}
