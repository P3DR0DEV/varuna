import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ComputerPresenter } from '../../presenters/computer-presenter'
import { errors } from '../_errors'
import { getComputerByTagUseCase } from './factories/make-get-computer-by-tag'
import { getComputerByTagSchema } from './schemas'

export async function getComputerByTag(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/tag/:tag',
    {
      schema: getComputerByTagSchema,
    },
    async (request, reply) => {
      const { tag } = request.params

      const result = await getComputerByTagUseCase.execute({ tag })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { computer } = result.value

      return reply.status(200).send({
        computer: ComputerPresenter.toHttp(computer),
      })
    },
  )
}
