import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { WorkstationPresenter, workstationSchema } from '../../presenters/workstation-presenter'
import { errors } from '../_errors'
import { createWorkstationUseCase } from './factories/make-create-workstation'

export async function createWorkstation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Workstation'],
        summary: 'Create workstation',
        body: z.object({
          computerId: z.string(),
          departmentId: z.string(),
        }),
        response: {
          201: z.object({ workstation: workstationSchema }),
          400: z.object({ name: z.string(), message: z.string() }),
          404: z.object({ name: z.string(), message: z.string() }),
        },
      },
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
