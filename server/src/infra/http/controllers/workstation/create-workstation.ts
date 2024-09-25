import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { WorkstationPresenter } from '../../presenters/workstation-presenter'
import { errors } from '../_errors'
import { createWorkstationUseCase } from './factories/make-create-workstation'
import { createWorkstationSchema } from './schemas'

export async function createWorkstation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: createWorkstationSchema,
    },
    async (request, reply) => {
      const props = request.body

      const result = await createWorkstationUseCase.execute(props)

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { workstation } = result.value

      return reply.status(201).send({
        workstation: WorkstationPresenter.toHttp(workstation),
      })
    },
  )
}
