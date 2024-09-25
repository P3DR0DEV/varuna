import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { UserLicensePresenter } from '../../presenters/user-license-presenter'
import { errors } from '../_errors'
import { fetchUserLicenseByUserUseCase } from './factories/fetch-user-licenses-by-user'
import { fetchUserLicenseRelationByUserSchema } from './schemas'

export async function fetchRelationByUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/user/:id',
    {
      schema: fetchUserLicenseRelationByUserSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await fetchUserLicenseByUserUseCase.execute({
        userId: id,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { userLicense } = result.value

      return reply.status(200).send({
        relations: userLicense.map(UserLicensePresenter.toHttp),
      })
    },
  )
}
