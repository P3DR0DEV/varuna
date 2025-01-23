import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { WorkstationPresenter } from '../../presenters/workstation-presenter'
import { errors } from '../_errors'
import { editWorkstationUseCase } from './factories/make-edit-workstation'
import { editWorkstationSchema } from './schemas'

export async function editWorkstation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: editWorkstationSchema,
    },
    async (request, reply) => {
      const { id } = request.params
      const props = request.body

      const result = await editWorkstationUseCase.execute({ id, ...props })

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
