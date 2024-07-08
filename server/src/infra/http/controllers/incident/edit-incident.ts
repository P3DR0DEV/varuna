import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { IncidentPresenter, incidentsSchema } from '../../presenters/incident-presenter'
import { errors } from '../_errors'
import { editIncidentUseCase } from './factories/make-edit-incident'

export async function editIncident(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: {
        tags: ['Incidents'],
        summary: 'Edit an incident',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          description: z.string(),
          workstationId: z.string().uuid(),
          deviceId: z.string().uuid().nullable(),
          fixedAt: z.coerce.date().nullable(),
        }),
        response: {
          200: z.object({
            incident: incidentsSchema,
          }),
          400: z.object({
            name: z.string(),
            message: z.string(),
          }),
          404: z.object({
            name: z.string(),
            message: z.string(),
          }),
        },
      },
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
