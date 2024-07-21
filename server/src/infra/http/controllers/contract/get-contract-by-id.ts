import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ContractPresenter, contractSchema } from '../../presenters/contract-presenter'
import { errors } from '../_errors'
import { getContractByIdUseCase } from './factories/make-get-contract-by-id'

export async function getContractById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['Contract'],
        summary: 'Get contract by id',
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        response: {
          200: z.object({ contract: contractSchema }),
          404: z.object({
            name: z.string(),
            message: z.string(),
          }),
          400: z.object({
            name: z.string(),
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getContractByIdUseCase.execute({ id })

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
