import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ContractPresenter } from '../../presenters/contract-presenter'
import { errors } from '../_errors'
import { editContractStatusUseCase } from './factories/make-edit-contract-status'
import { editContractStatusSchema } from './schemas'

export async function editContractStatus(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/:id/status',
    {
      schema: editContractStatusSchema,
    },
    async (request, reply) => {
      const { id } = request.params
      const { status } = request.body

      const result = await editContractStatusUseCase.execute({ id, status })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { contract } = result.value

      return reply.status(200).send({ contract: ContractPresenter.toHttp(contract) })
    },
  )
}
