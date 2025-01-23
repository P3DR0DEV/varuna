import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { UserLicensePresenter } from '../../presenters/user-license-presenter'
import { errors } from '../_errors'
import { getUserLicenseByIdUseCase } from './factories/make-get-user-license-by-id'
import { getUserLicenseRelationByIdSchema } from './schemas'

export async function getRelationById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: getUserLicenseRelationByIdSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getUserLicenseByIdUseCase.execute({
        id,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { userLicense } = result.value

      return reply.status(200).send({ relation: UserLicensePresenter.toHttp(userLicense) })
    },
  )
}
