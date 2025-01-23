import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ComputerPresenter } from '../../presenters/computer-presenter'
import { errors } from '../_errors'
import { getComputerByHostnameUseCase } from './factories/make-get-computer-by-hostname'
import { getComputerByHostnameSchema } from './schemas'

export async function getComputerByHostname(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/hostname/:hostname',
    {
      schema: getComputerByHostnameSchema,
    },
    async (request, reply) => {
      const { hostname } = request.params

      const result = await getComputerByHostnameUseCase.execute({ hostname })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { computer } = result.value

      return reply.status(200).send({ computer: ComputerPresenter.toHttp(computer) })
    },
  )
}
