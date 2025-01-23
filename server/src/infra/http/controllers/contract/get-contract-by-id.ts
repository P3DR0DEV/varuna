import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ContractPresenter } from '../../presenters/contract-presenter'
import { errors } from '../_errors'
import { getContractByIdUseCase } from './factories/make-get-contract-by-id'
import { getContractByIdSchema } from './schemas'

export async function getContractById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: getContractByIdSchema,
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
