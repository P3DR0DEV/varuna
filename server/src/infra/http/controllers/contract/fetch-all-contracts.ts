import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ContractPresenter } from '../../presenters/contract-presenter'
import { errors } from '../_errors'
import { fetchAllContractsUseCase } from './factories/make-fetch-all-contracts'
import { fetchAllContractsSchema } from './schemas'

export async function fetchAllContracts(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: fetchAllContractsSchema,
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
