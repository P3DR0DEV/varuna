import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { WorkstationPresenter } from '../../presenters/workstation-presenter'
import { errors } from '../_errors'
import { getWorkstationByIdUseCase } from './factories/make-get-workstation-by-id'
import { getWorkstationByIdSchema } from './schemas'

export async function getWorkstationById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: getWorkstationByIdSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getWorkstationByIdUseCase.execute({
        id,
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
