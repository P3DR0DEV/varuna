import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { WorkstationPresenter } from '../../presenters/workstation-presenter'
import { errors } from '../_errors'
import { getWorkstationByComputerIdUseCase } from './factories/make-get-workstation-by-computer-id'
import { getWorkstationByComputerSchema } from './schemas'

export async function getWorkstationByComputer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/computer/:id',
    {
      schema: getWorkstationByComputerSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getWorkstationByComputerIdUseCase.execute({
        computerId: id,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { workstation } = result.value

      return reply.status(200).send({ workstation: WorkstationPresenter.toHttp(workstation) })
    },
  )
}
