import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { WorkstationPresenter, workstationSchema } from '../../presenters/workstation-presenter'
import { errors } from '../_errors'
import { fetchAllWorkstationsUseCase } from './factories/make-fetch-all-workstations'

export async function fetchAllWorkstations(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['Workstation'],
        summary: 'Fetch all workstations',
        response: {
          200: z.object({ workstations: z.array(workstationSchema) }),
        },
      },
    },
    async (request, reply) => {
      const result = await fetchAllWorkstationsUseCase.execute()

      if (result.isFailure()) {
        throw new errors.InternalServerError('Unexpected error')
      }

      const { workstations } = result.value

      return reply.status(200).send({ workstations: workstations.map(WorkstationPresenter.toHttp) })
    },
  )
}
