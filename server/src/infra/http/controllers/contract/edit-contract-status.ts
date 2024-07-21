import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ContractPresenter } from '../../presenters/contract-presenter'
import { errors } from '../_errors'
import { editContractStatusUseCase } from './factories/make-edit-contract-status'

export async function editContractStatus(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/:id/status',
    {
      schema: {
        tags: ['Contract'],
        summary: 'Edit contract status',
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        body: z.object({
          status: z.enum(['active', 'inactive']),
        }),
      },
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
