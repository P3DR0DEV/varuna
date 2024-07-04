import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ComputerPresenter, computersSchema } from '../../presenters/computer-presenter'
import { errors } from '../_errors'
import { createComputerUseCase } from './factories/make-create-computer'

export async function createComputer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        summary: 'Create a new computer',
        tags: ['Computers'],
        body: z.object({
          acquisitionDate: z.coerce.date(),
          description: z.string(),
          hostname: z.string(),
          ipAddress: z.string(),
          model: z.string(),
          operatingSystem: z.string(),
          serialNumber: z.string(),
          type: z.enum(['server', 'notebook', 'desktop']),
          contractId: z.string().nullish(),
          endWarrantyDate: z.coerce.date().nullish(),
          invoiceNumber: z.string(),
        }),

        response: {
          201: z.object({
            computer: computersSchema
          }),

          400: z.object({
            name: z.string(),
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const props = request.body

      const result = await createComputerUseCase.execute(props)

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { computer } = result.value
      return reply.status(201).send({
        computer: ComputerPresenter.toHttp(computer),
      })
    },
  )
}
