import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ContractPresenter, contractSchema } from '../../presenters/contract-presenter'
import { errors } from '../_errors'
import { editContractUseCase } from './factories/make-edit-contract'

export async function editContract(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: {
        tags: ['Contract'],
        summary: 'Edit contract',
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        body: z.object({
          description: z.string(),
          type: z.enum(['renting', 'borrowing']),
          userEmail: z.string(),
          fileName: z.string(),
          status: z.enum(['active', 'inactive']),
          endsAt: z.coerce.date().nullable(),
        }),

        response: {
          200: z.object({
            contract: contractSchema,
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

      const result = await editContractUseCase.execute({ id, ...props })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { contract } = result.value

      return reply.status(200).send({
        contract: ContractPresenter.toHttp(contract),
      })
    },
  )
}
