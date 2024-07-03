import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ComputerPresenter } from '../../presenters/computer-presenter'
import { errors } from '../_errors'
import { editComputerUseCase } from './factories/make-edit-computer'

export async function editComputer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: {
        summary: 'Edit computer',
        tags: ['Computers'],
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          acquisitionDate: z.coerce.date(),
          description: z.string(),
          hostname: z.string(),
          ipAddress: z.string(),
          model: z.string(),
          operatingSystem: z.string(),
          serialNumber: z.string(),
          type: z.enum(['server', 'notebook', 'desktop']),
          contractId: z.string(),
          endWarrantyDate: z.coerce.date(),
          invoiceNumber: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const props = request.body

      const result = await editComputerUseCase.execute({ id, ...props })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { computer } = result.value

      return reply.status(200).send({ computer: ComputerPresenter.toHttp(computer) })
    },
  )
}
