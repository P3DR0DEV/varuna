import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { WorkstationPresenter } from '../../presenters/workstation-presenter'
import { errors } from '../_errors'
import { fetchAllWorkstationsUseCase } from './factories/make-fetch-all-workstations'
import { fetchAllWorkstationsSchema } from './schemas'

export async function fetchAllWorkstations(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: fetchAllWorkstationsSchema,
    },
    async (_request, reply) => {
      const result = await fetchAllWorkstationsUseCase.execute()

      if (result.isFailure()) {
        throw new errors.InternalServerError('Unexpected error')
      }

      const { workstations } = result.value

      return reply.status(200).send({ workstations: workstations.map(WorkstationPresenter.toHttp) })
    },
  )
}
