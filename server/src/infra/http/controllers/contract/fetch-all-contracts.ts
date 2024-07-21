import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ContractPresenter, contractSchema } from '../../presenters/contract-presenter'
import { errors } from '../_errors'
import { fetchAllContractsUseCase } from './factories/make-fetch-all-contracts'

export async function fetchAllContracts(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['Contract'],
        summary: 'Fetch all contracts',
        querystring: z.object({
          userEmail: z.string().email().optional(),
          type: z.enum(['renting', 'borrowing']).optional(),
        }),
        response: {
          200: z.object({
            contracts: z.array(contractSchema),
          }),
        },
      },
    },
    async (request, reply) => {
      const { type, userEmail } = request.query

      const result = await fetchAllContractsUseCase.execute({ type, userEmail })

      if (result.isFailure()) {
        throw new errors.InternalServerError('Unexpected error')
      }

      const { contracts } = result.value

      return reply.status(200).send({
        contracts: contracts.map(ContractPresenter.toHttp),
      })
    },
  )
}
