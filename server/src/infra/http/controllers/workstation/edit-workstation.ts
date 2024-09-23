import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { WorkstationPresenter, workstationSchema } from '../../presenters/workstation-presenter'
import { errors } from '../_errors'
import { editWorkstationUseCase } from './factories/make-edit-workstation'

export async function editWorkstation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: {
        tags: ['Workstation'],
        summary: 'Edit workstation',
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        body: z.object({
          computerId: z.string().uuid('Invalid ID type, must be a UUID'),
          departmentId: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        response: {
          201: z.object({ workstation: workstationSchema }),
          400: z.object({ name: z.string(), message: z.string() }),
          404: z.object({ name: z.string(), message: z.string() }),
        },
      },
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
