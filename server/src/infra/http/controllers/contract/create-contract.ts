import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { generateFileName } from '@/infra/util/generate-file-name'

import { ContractPresenter } from '../../presenters/contract-presenter'
import { errors } from '../_errors'
import { createContractUseCase } from './factories/make-create-contract'
import { createContractSchema } from './schemas'

export async function createContract(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: createContractSchema,
    },
    async (request, reply) => {
      const { file, description, endsAt, type, userEmail, status } = request.body

      const fileName = generateFileName(file)

      const result = await createContractUseCase.execute({
        fileName,
        description: description.value,
        endsAt: endsAt.value,
        type: type.value,
        userEmail: userEmail.value,
        status: status.value,
      })

      // TODO Handle file upload

      if (result.isFailure()) {
        throw new errors.InternalServerError('Unexpected error')
      }

      const { contract } = result.value

      return reply.status(201).send({
        contract: ContractPresenter.toHttp(contract),
      })
    },
  )
}
