import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ContractPresenter } from '../../presenters/contract-presenter'
import { errors } from '../_errors'
import { editContractUseCase } from './factories/make-edit-contract'
import { editContractSchema } from './schemas'

export async function editContract(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: editContractSchema,
    },

    async (request, reply) => {
      const { id } = request.params

      // TODO Handle file upload
      const { file, description, endsAt, type, userEmail, status } = request.body

      const result = await editContractUseCase.execute({
        id,
        description: description.value,
        endsAt: endsAt.value,
        type: type.value,
        userEmail: userEmail.value,
        status: status.value,
        fileName: file.filename,
      })

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
