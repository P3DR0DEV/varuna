import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { IncidentPresenter } from '../../presenters/incident-presenter'
import { errors } from '../_errors'
import { fetchIncidentsByWorkstationUseCase } from './factories/make-fetch-incidents-by-workstation'
import { fetchIncidentsByWorkstationSchema } from './schemas'

export async function fetchIncidentsByWorkstation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/workstation/:id',
    {
      schema: fetchIncidentsByWorkstationSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await fetchIncidentsByWorkstationUseCase.execute({ workstationId: id })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { incidents } = result.value

      return reply.status(200).send({
        incidents: incidents.map(IncidentPresenter.toHttp),
      })
    },
  )
}
