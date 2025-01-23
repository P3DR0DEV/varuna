import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { IncidentPresenter } from '../../presenters/incident-presenter'
import { errors } from '../_errors'
import { createIncidentUseCase } from './factories/make-create-incident'
import { createIncidentSchema } from './schemas'

export async function createIncident(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: createIncidentSchema,
    },
    async (request, reply) => {
      const { deviceId, workstationId, description } = request.body

      const result = await createIncidentUseCase.execute({
        deviceId,
        workstationId,
        description,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason
        throw new errors[name](message)
      }

      const { incident } = result.value

      return reply.status(201).send({ incident: IncidentPresenter.toHttp(incident) })
    },
  )
}
