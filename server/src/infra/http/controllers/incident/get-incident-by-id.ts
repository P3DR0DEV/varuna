import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { IncidentPresenter } from '../../presenters/incident-presenter'
import { errors } from '../_errors'
import { getIncidentByIdUseCase } from './factories/make-get-incident-by-id'
import { getIncidentByIdSchema } from './schemas'

export async function getIncidentById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: getIncidentByIdSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getIncidentByIdUseCase.execute({ id })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { incident } = result.value

      return reply.status(200).send({
        incident: IncidentPresenter.toHttp(incident),
      })
    },
  )
}
