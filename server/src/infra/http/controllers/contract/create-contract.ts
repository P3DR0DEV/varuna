import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ContractPresenter } from '../../presenters/contract-presenter'
import { errors } from '../_errors'
import { createContractUseCase } from './factories/make-create-contract'
import { createUploadsUseCase } from './factories/make-create-uploads'
import { createContractSchema } from './schemas'

export async function createContract(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: createContractSchema,
    },
    async (request, reply) => {
      const { file, description, endsAt, type, userEmail, status, userId } = request.body

      const createUploads = await createUploadsUseCase.execute({ file, userId: userId.value })

      if (createUploads.isFailure()) {
        const { name } = createUploads.reason

        switch (name) {
          case 'BadRequestError':
            throw new errors.BadRequestError(createUploads.reason.message)
          case 'NotFoundError':
            throw new errors.NotFoundError(createUploads.reason.message)
          default:
            throw new errors.InternalServerError('Unexpected error')
        }
      }

      const fileName = createUploads.value

      const result = await createContractUseCase.execute({
        fileName,
        description: description.value,
        endsAt: endsAt.value,
        type: type.value,
        userEmail: userEmail.value,
        status: status.value,
      })

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
