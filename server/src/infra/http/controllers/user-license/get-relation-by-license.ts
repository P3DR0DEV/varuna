import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { UserLicensePresenter } from '../../presenters/user-license-presenter'
import { errors } from '../_errors'
import { getUserLicenseByLicenseUseCase } from './factories/make-get-user-license-by-license'
import { fetchUserLicenseRelationsByLicenseSchema } from './schemas'

export async function getRelationByLicense(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/license/:id',
    {
      schema: fetchUserLicenseRelationsByLicenseSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getUserLicenseByLicenseUseCase.execute({
        licenseId: id,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { userLicense } = result.value

      return reply.code(200).send({ relation: UserLicensePresenter.toHttp(userLicense) })
    },
  )
}
