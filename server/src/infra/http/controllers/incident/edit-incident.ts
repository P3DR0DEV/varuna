import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { IncidentPresenter } from '../../presenters/incident-presenter'
import { errors } from '../_errors'
import { editIncidentUseCase } from './factories/make-edit-incident'
import { editIncidentSchema } from './schemas'

export async function editIncident(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: editIncidentSchema,
    },
    async (request, reply) => {
      const { id } = request.params
      const props = request.body

      const result = await editIncidentUseCase.execute({
        id,
        ...props,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { incident } = result.value

      return reply.status(200).send({
        incident: IncidentPresenter.toHttp(incident),
      })
    },
  )
}
