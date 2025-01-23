import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { IncidentPresenter } from '../../presenters/incident-presenter'
import { errors } from '../_errors'
import { fetchIncidentsByDeviceUseCase } from './factories/make-fetch-incidents-by-device'
import { fetchIncidentsByDeviceSchema } from './schemas'

export async function fetchIncidentsByDevice(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/device/:id',
    {
      schema: fetchIncidentsByDeviceSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await fetchIncidentsByDeviceUseCase.execute({ deviceId: id })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { incidents } = result.value

      return reply.status(200).send({ incidents: incidents.map(IncidentPresenter.toHttp) })
    },
  )
}
