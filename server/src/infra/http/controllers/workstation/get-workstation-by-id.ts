import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { WorkstationPresenter, workstationSchema } from '../../presenters/workstation-presenter'
import { errors } from '../_errors'
import { getWorkstationByIdUseCase } from './factories/make-get-workstation-by-id'

export async function getWorkstationById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['Workstation'],
        summary: 'Get workstation by id',
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        response: {
          200: z.object({
            workstation: workstationSchema,
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

      const result = await getWorkstationByIdUseCase.execute({
        id,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { workstation } = result.value

      return reply.status(200).send({ workstation: WorkstationPresenter.toHttp(workstation) })
    },
  )
}
