import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ComputerPresenter } from '../../presenters/computer-presenter'
import { errors } from '../_errors'
import { editComputerUseCase } from './factories/make-edit-computer'
import { editComputerSchema } from './schemas'

export async function editComputer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: editComputerSchema,
    },
    async (request, reply) => {
      const { id } = request.params
      const props = request.body

      const result = await editComputerUseCase.execute({ id, ...props })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { computer } = result.value

      return reply.status(200).send({ computer: ComputerPresenter.toHttp(computer) })
    },
  )
}
