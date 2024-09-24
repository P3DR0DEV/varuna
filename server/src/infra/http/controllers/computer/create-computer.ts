import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ComputerPresenter } from '../../presenters/computer-presenter'
import { errors } from '../_errors'
import { createComputerUseCase } from './factories/make-create-computer'
import { createComputerSchema } from './schemas'

export async function createComputer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: createComputerSchema,
    },
    async (request, reply) => {
      const props = request.body

      const result = await createComputerUseCase.execute(props)

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { computer } = result.value
      return reply.status(201).send({
        computer: ComputerPresenter.toHttp(computer),
      })
    },
  )
}
